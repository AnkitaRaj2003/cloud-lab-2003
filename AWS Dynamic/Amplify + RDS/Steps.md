Architecture
Frontend (AWS Amplify)
        ↓ API call
Backend (AWS Lambda)
        ↓
Database (DynamoDB)

Services used:

AWS Amplify
AWS Lambda
Amazon API Gateway
Amazon DynamoDB

--------------------------------------------
Step 1 — create database

Open:

Amazon DynamoDB

Create table:

Table name: todos
Primary key: id (string)

Click Create table

-----------------------------------------
Step 2 — create backend (Lambda)

Open:

AWS Lambda

Create function:

Name: todoAPI
Runtime: Node.js 20

Replace code with:

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  DeleteCommand,
  ScanCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {

 try{

  const method =
  event.requestContext?.http?.method
  || event.httpMethod;

  // CREATE TODO
  if(method === "POST"){

   const body = JSON.parse(event.body);

   await db.send(new PutCommand({

    TableName:"todos",

    Item:{
     id: Date.now().toString(),
     text: body.text
    }

   }));

  }

  // DELETE TODO
  if(method === "DELETE"){

   const body = JSON.parse(event.body);

   await db.send(new DeleteCommand({

    TableName:"todos",

    Key:{
     id: body.id
    }

   }));

  }

  // GET TODOS
  const result =
  await db.send(new ScanCommand({

   TableName:"todos"

  }));

  return {

   statusCode:200,

   headers:{
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Headers":"*",
    "Access-Control-Allow-Methods":"*"
   },

   body:JSON.stringify(result.Items)

  };

 }

 catch(error){

  return {

   statusCode:500,

   body:JSON.stringify(error.message)

  };

 }

};

Click Deploy

-----------------------------------------
Step 3 — create API endpoint

Open:

Amazon API Gateway

Create:

HTTP API

Add integration → Lambda → select todoAPI

Enable routes:

GET /
POST /
DELETE /

After creation you get URL like:

https://abc123.execute-api.ap-south-1.amazonaws.com

Copy this URL.

-----------------------------------------------------------

Step 4 — create frontend

Create file:

index.html
<!DOCTYPE html>

<html>

<body>

<h2>AWS Todo List</h2>

<input id="todoInput" placeholder="Enter todo">

<button onclick="addTodo()">Add</button>

<ul id="list"></ul>

<script>

const API =
"https://abc123.execute-api.ap-south-1.amazonaws.com"


async function loadTodos(){

 const res = await fetch(API)

 const data = await res.json()

 const list =
 document.getElementById("list")

 list.innerHTML=""

 data.forEach(todo=>{

  const li =
  document.createElement("li")

  li.innerHTML =

  todo.text +

  ` <button
  onclick="deleteTodo('${todo.id}')">
  delete
  </button>`

  list.appendChild(li)

 })

}


async function addTodo(){

 const text =
 document.getElementById("todoInput").value

 await fetch(API,{

  method:"POST",

  body:JSON.stringify({text})

 })

 loadTodos()

}


async function deleteTodo(id){

 await fetch(API,{

  method:"DELETE",

  body:JSON.stringify({id})

 })

 loadTodos()

}

loadTodos()

</script>

</body>

</html>

Replace API URL with yours.

-----------------------------------------------------------
Step 5 — deploy frontend

Open:

AWS Amplify

Click:

Deploy without Git

Upload:

index.html

Deploy.

Amplify gives URL like:

https://main.xxxxxx.amplifyapp.com
