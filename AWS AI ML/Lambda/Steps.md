create a new function
go to configuration -> permissions -> attach permissions -> attach json

{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": "sagemaker:InvokeEndpoint",
			"Resource": "arn:aws:sagemaker:us-east-2:815373273378:endpoint/iris-endpoint-035229"
		}
	]
}

