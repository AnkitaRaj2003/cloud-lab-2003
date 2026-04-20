Great 🔥 now let’s deploy the same model using AWS Lambda so you don’t need EC2 running all the time.

Flow will be:

User → API Gateway → Lambda → SageMaker Endpoint → Prediction
Step 1 — create Lambda function

Go to AWS Console → Lambda → Create function

Choose:

Author from scratch

Fill:

Field	Value
Function name	iris-predict
Runtime	Node.js 20.x
Architecture	x86_64

Click Create function

Step 2 — add permissions

Lambda → Configuration → Permissions → Execution role

Click role name → Add permission → Attach policy

Attach:

AmazonSageMakerFullAccess

(or create custom policy with InvokeEndpoint permission)

Step 3 — Lambda code (copy paste)

Open Lambda → Code → replace index.js with:

import { SageMakerRuntimeClient, InvokeEndpointCommand } from "@aws-sdk/client-sagemaker-runtime";

const client = new SageMakerRuntimeClient({
  region: "ap-southeast-2"
});

export const handler = async (event) => {

  try {

    const data = JSON.parse(event.body);

    const command = new InvokeEndpointCommand({

      EndpointName: "iris-endpoint-103616",

      Body: JSON.stringify(data),

      ContentType: "application/json"

    });

    const response = await client.send(command);

    const result = new TextDecoder().decode(response.Body);

    return {

      statusCode: 200,

      headers: {
        "Content-Type": "application/json"
      },

      body: result

    };

  } catch (error) {

    return {

      statusCode: 500,

      body: JSON.stringify({

        error: error.message

      })

    };

  }

};

Click Deploy

Step 4 — add API Gateway trigger

Lambda → Add trigger → API Gateway

Choose:

Field	Value
API type	HTTP API
Security	Open
Method	POST

Click Add

You will get URL like:

https://abc123.execute-api.ap-southeast-2.amazonaws.com/default/iris-predict
Step 5 — test Lambda API

From terminal:

curl -X POST https://abc123.execute-api.ap-southeast-2.amazonaws.com/default/iris-predict \
-H "Content-Type: application/json" \
-d '[5.1,3.5,1.4,0.2]'

Expected output:

[0]
Step 6 — use Lambda in your frontend

Replace EC2 URL:

http://13.239.55.226:3000/predict

with:

https://abc123.execute-api.ap-southeast-2.amazonaws.com/default/iris-predict
