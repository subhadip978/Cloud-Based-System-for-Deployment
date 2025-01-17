const {exec} =require("child_process")
const path=require('path')

const fs=require('fs');

const {S3Client, PutObjectCommand}=require('@aws-sk/client-s3')
const mime= require('mime-types')

const s3Client= new S3Client({
	region:'ap-south-1',
	credentials:{
		accessKeyId:'',
		secretAccessKey:''

	}
})


const PROJECT_ID =process.env.PROJECT_ID
async function init(){

	const outdirpath=path.join(__dirname,'output') ;
	const p= exec(`cd ${outdirpath}&& npm install && npm run build`)

	p.stdout.on('data',function(data){
		console.log(data.toString())
	})


	p.on('close',async function(){
		console.log('Build complete')

		const distFolderPath=path.join(__dirname,'output','dist')
		
		
		const distFolderContents=fs.readdirSync(distFolderPath,{})


		for(const filePath of distFolderContents){
			if(fs.lstatSync(filePath).isDirectory()) continue ;


			const command=new PutObjectCommand({
				Bucket:'',
				key:`___outputs/${PROJECT_ID}/${filePath}`,
				body:fs.createReadStream(filePath),
				contentType:mime.lookup(filePath)

			})

			await S3Client.send(command)
		}
		console.log("DONE ------")
	})



}

init()