Project Structure
iris-apprunner/
│
├── server.js
├── package.json
├── .gitignore
└── public/
    └── index.html
1️⃣ server.js
require("dotenv").config();

const path = require("path");
const express = require("express");
const {
  SageMakerRuntimeClient,
  InvokeEndpointCommand,
} = require("@aws-sdk/client-sagemaker-runtime");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
const AWS_REGION = process.env.AWS_REGION || "ap-southeast-2";
const SAGEMAKER_ENDPOINT_NAME = process.env.SAGEMAKER_ENDPOINT_NAME;

const client = new SageMakerRuntimeClient({
  region: AWS_REGION,
});

app.get("/health", (req, res) => {
  res.json({
    status: "running",
    region: AWS_REGION,
    endpoint: SAGEMAKER_ENDPOINT_NAME,
  });
});

app.post("/predict", async (req, res) => {
  try {
    const data = req.body.data;

    if (!Array.isArray(data) || data.length !== 4) {
      return res.status(400).json({
        error: "Send JSON like { data: [5.1,3.5,1.4,0.2] }",
      });
    }

    const command = new InvokeEndpointCommand({
      EndpointName: SAGEMAKER_ENDPOINT_NAME,
      ContentType: "application/json",
      Body: JSON.stringify(data),
    });

    const response = await client.send(command);

    const result = Buffer.from(response.Body).toString("utf-8");

    return res.json({
      prediction: JSON.parse(result),
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Prediction failed",
      details: error.message,
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
2️⃣ package.json
{
  "name": "iris-apprunner",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "dotenv": "^16.4.0",
    "@aws-sdk/client-sagemaker-runtime": "^3.540.0"
  }
}
3️⃣ .gitignore
node_modules
.env
npm-debug.log
4️⃣ public/index.html (simple UI)
<!DOCTYPE html>
<html>
<head>
<title>Iris Prediction</title>
</head>

<body>

<h2>Iris Flower Prediction</h2>

<input id="f1" placeholder="sepal length"><br><br>
<input id="f2" placeholder="sepal width"><br><br>
<input id="f3" placeholder="petal length"><br><br>
<input id="f4" placeholder="petal width"><br><br>

<button onclick="predict()">Predict</button>

<h3 id="result"></h3>

<script>

async function predict(){

const data = [
Number(document.getElementById("f1").value),
Number(document.getElementById("f2").value),
Number(document.getElementById("f3").value),
Number(document.getElementById("f4").value)
];

const response = await fetch("/predict",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({data})

});

const result = await response.json();

document.getElementById("result").innerText =
"Prediction: " + JSON.stringify(result.prediction);

}

</script>

</body>
</html>
5️⃣ push to GitHub
git init
git add .
git commit -m "app runner deployment"
git branch -M main
git remote add origin YOUR_REPO_LINK
git push -u origin main
6️⃣ App Runner settings

Build command:

npm install

Start command:

npm start

Port:

3000

Environment variables:

PORT=3000
AWS_REGION=ap-southeast-2
SAGEMAKER_ENDPOINT_NAME=iris-endpoint-103616
AWS_ACCESS_KEY_ID=NEW_KEY
AWS_SECRET_ACCESS_KEY=NEW_SECRET
Test after deploy
https://your-app-url.ap-southeast-2.awsapprunner.com
