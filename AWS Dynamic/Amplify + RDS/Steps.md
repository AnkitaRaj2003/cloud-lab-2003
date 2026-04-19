⭐ Elastic Beanstalk + RDS (Easiest Method)
frontend → simple HTML page
backend → Node.js (Express)
database → AWS RDS PostgreSQL
deployment → AWS Elastic Beanstalk
coding → AWS CloudShell (browser terminal)

Everything runs inside AWS only.

Architecture
Browser
  ↓
Elastic Beanstalk (Node.js server + HTML)
  ↓
Amazon RDS (PostgreSQL database)

Services used:

AWS Elastic Beanstalk → runs backend + hosts frontend
Amazon RDS → database
AWS CloudShell → write & deploy code
Step-by-step
Step 1 — open CloudShell (no local setup)

Login AWS console → open:

AWS CloudShell

Create project:

mkdir beanstalk-app
cd beanstalk-app
Step 2 — create backend code

Create file:

nano server.js

Paste:

const express = require("express")
const { Pool } = require("pg")

const app = express()

const pool = new Pool({
  host: process.env.DB_HOST,
  user: "postgres",
  password: "password",
  database: "testdb",
  port: 5432
})

app.get("/api", async (req,res)=>{

 await pool.query(`
 CREATE TABLE IF NOT EXISTS demo(
   id SERIAL PRIMARY KEY,
   text VARCHAR(50)
 )
 `)

 await pool.query(`
 INSERT INTO demo(text)
 VALUES('Hello from AWS RDS')
 `)

 const result =
 await pool.query("SELECT * FROM demo")

 res.json(result.rows)

})

app.use(express.static("public"))

app.listen(8080)

Save:
CTRL+X → Y → Enter

Step 3 — create package.json
nano package.json

Paste:

{
 "name":"beanstalk-app",
 "version":"1.0.0",
 "main":"server.js",
 "dependencies":{
  "express":"^4.18.2",
  "pg":"^8.11.3"
 }
}

Save.

Install packages:

npm install
Step 4 — create simple frontend
mkdir public
nano public/index.html

Paste:

<!DOCTYPE html>

<html>

<body>

<h2>Elastic Beanstalk + RDS</h2>

<button onclick="load()">
Call backend
</button>

<pre id="result"></pre>

<script>

async function load(){

 const res =
 await fetch("/api")

 const data =
 await res.json()

 document.getElementById("result")
 .textContent =
 JSON.stringify(data,null,2)

}

</script>

</body>

</html>

Save.

Step 5 — create database on AWS

Open:

Amazon RDS

Create database:

settings:

engine → PostgreSQL
db name → testdb
username → postgres
password → password
public access → YES

After creation copy:

endpoint example:
database-1.abc123.us-east-1.rds.amazonaws.com
Step 6 — allow connection to DB

RDS → Security group → inbound rule:

type → PostgreSQL
port → 5432
source → anywhere
Step 7 — zip code inside AWS

In CloudShell:

zip -r app.zip .

Download OR directly upload zip.

Step 8 — create Elastic Beanstalk app

Open:

AWS Elastic Beanstalk

Click:

Create application

settings:

platform → Node.js
upload code → upload app.zip
Step 9 — connect database

Elastic Beanstalk → configuration → environment variables

Add:

DB_HOST = your RDS endpoint

Example:

DB_HOST =
database-1.abc123.us-east-1.rds.amazonaws.com

Save → wait for update.

Step 10 — open app

Elastic Beanstalk gives URL:

http://beanstalk-app-env.eba-xyz.us-east-1.elasticbeanstalk.com

Open in browser.

Click button → data from AWS database appears 🎉
