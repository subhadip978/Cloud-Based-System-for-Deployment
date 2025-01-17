const express= require('express');
const app=express();
const PORT =8000 
const httpProxy=require('http-proxy')



app.use((req,res)=>{


		const  hostname=req.hostname;
		const subdomain=hostname.split('.')[0] ;
		const resolvesTo= `http://vercel-clone.s3.ap-south-1.amazonaws.com/_outputs/${subdomain}` ;

		Proxy.web(req,res,{target:resolvesTo,changeOrigin:true})
})

Proxy.on('proxyReq',(req,res)=>{
	const url=req.url ;
	if(url ==="/"){
		proxyReq.path+=index.html ;
	}
})

app.listen(PORT,()=>{
	console.log(`reverse proxy is running at http://localhost:${port}`)
})


//when request come to reverse proxy ,it will mapped this __outputs/{project_id}