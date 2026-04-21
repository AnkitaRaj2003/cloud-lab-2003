import { SageMakerRuntimeClient, InvokeEndpointCommand } from "@aws-sdk/client-sagemaker-runtime";

const client = new SageMakerRuntimeClient({
  region: "us-east-2"
});

const ENDPOINT_NAME = "iris-endpoint-035229";

export const handler = async (event) => {
  try {
    const input = {
      EndpointName: ENDPOINT_NAME,
      ContentType: "application/json",
      Body: JSON.stringify(event.data)
    };

    const command = new InvokeEndpointCommand(input);
    const response = await client.send(command);

    const result = JSON.parse(Buffer.from(response.Body).toString());

    return {
      statusCode: 200,
      body: JSON.stringify({
        prediction: result
      })
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};
