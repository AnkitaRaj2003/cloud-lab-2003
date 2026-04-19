⭐ AWS Amplify + Lambda + DynamoDB (simplest working alternative)

Everything stays inside AWS:

frontend hosted on AWS
backend runs on AWS
database on AWS
no EC2 needed (so verification rarely blocks it)
Architecture
HTML page (Amplify Hosting)
        ↓ fetch()
API (AWS Lambda)
        ↓
Database (DynamoDB)

Services used:

AWS Amplify → host HTML
AWS Lambda → backend logic
Amazon DynamoDB → database
Amazon API Gateway → API endpoint
Step-by-step (very simple)
Step 1 — create database

Open:

Amazon DynamoDB

Create table:

Table name: demoTable
Primary key: id (string)

Click create.

Step 2 — create backend (Lambda)

Open:

AWS Lambda

Create function:

runtime: Node.js
function name: demoAPI

Replace code with:

const AWS = require("aws-sdk")

const db =
new AWS.DynamoDB.DocumentClient()

exports.handler = async ()=>{

 await db.put({
  TableName:"demoTable",
  Item:{
   id: Date.now().toString(),
   message:"Hello from DynamoDB"
  }
 }).promise()

 const result =
 await db.scan({
  TableName:"demoTable"
 }).promise()

 return {

  statusCode:200,

  headers:{
   "Access-Control-Allow-Origin":"*"
  },

  body:JSON.stringify(result.Items)

 }

}

Click Deploy.

Step 3 — create API endpoint

Open:

Amazon API Gateway

Create API:

type → HTTP API
integration → Lambda
select → demoAPI

After creation you get URL:

https://abc123.execute-api.ap-south-1.amazonaws.com

Copy this.

Step 4 — create simple frontend

Create file locally:

index.html
<!DOCTYPE html>

<html>

<body>

<h2>AWS Full Stack App</h2>

<button onclick="loadData()">
Call backend
</button>

<pre id="output"></pre>

<script>

async function loadData(){

 const res =
 await fetch(
 "https://abc123.execute-api.ap-south-1.amazonaws.com"
 )

 const data =
 await res.json()

 document.getElementById("output")
 .textContent =
 JSON.stringify(data,null,2)

}

</script>

</body>

</html>

Replace URL with your API URL.

Step 5 — host frontend

Open:

AWS Amplify

Click:

Deploy without Git

Upload:

index.html

Deploy.

Amplify gives URL like:

https://main.xxxxxx.amplifyapp.com

Open site → click button → data from AWS DB 🎉
