const express= require('express');
const app=express();
const PORT =9000 

const ecsClient = new ECSClient({
	credentials:{
		accesskey:process.env.ACCESSKEY,
		secretkey:process.env.SECRETKEY


	}
})

const input={
	CLUSTER:process.env.CLUSTER_ARN,
	TASK:process.env.TASK_ARN
}

app.post('/project',(req,res)=>{
	
	const {gitURL}=req.body ;
	const projectSlug=generateSlug();

	//spin the container on ECS

	const command= new RuntaskCommand({
		cluster:input.CLUSTER,
		taskDefinition:input.TASK,
		launchType:'FARGATE',
		count:1,
		networkConfigurations:{
			
		}



	})





})

app.listen(PORT,()=>{
	console.log(`server is running at http://localhost:${port}`)
})