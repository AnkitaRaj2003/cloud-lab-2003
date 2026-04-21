const express = require("express")
const fetch = require("node-fetch")

const app = express()
app.use(express.json())

// REST endpoint
const ML_URL = "https://ml-demo-app-fpyuy.canadacentral.inference.ml.azure.com/score"
const API_KEY = "PASTE_AZURE_KEY"

app.post("/predict", async (req,res)=>{

 const response = await fetch(ML_URL,{
  method:"POST",
  headers:{
   "Content-Type":"application/json",
   "Authorization":`Bearer ${API_KEY}`
  },
  body: JSON.stringify(req.body)
 })

 const data = await response.json()

 res.json(data)

})

app.get("/",(req,res)=>{
 res.send("API running")
})

app.listen(process.env.PORT || 3000)
