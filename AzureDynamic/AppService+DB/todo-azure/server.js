const express = require("express")
const sql = require("mssql")

const app = express()

app.use(express.json())
app.use(express.static("public"))

const config = {

 user: process.env.DB_USER,

 password: process.env.DB_PASS,

 server: process.env.DB_SERVER,

 database: "tododb",

 options: {
  encrypt: true
 }

}

// get todos
app.get("/api", async (req,res)=>{

 const pool =
 await sql.connect(config)

 const result =
 await pool.request()
 .query("SELECT * FROM todos")

 res.json(result.recordset)

})

// add todo
app.post("/api", async (req,res)=>{

 const pool =
 await sql.connect(config)

 await pool.request()

 .input("text",sql.VarChar,req.body.text)

 .query(
 "INSERT INTO todos(text) VALUES(@text)"
 )

 res.send("added")

})

// delete todo
app.delete("/api", async (req,res)=>{

 const pool =
 await sql.connect(config)

 await pool.request()

 .input("id",sql.Int,req.body.id)

 .query(
 "DELETE FROM todos WHERE id=@id"
 )

 res.send("deleted")

})

app.listen(process.env.PORT || 3000)
