## 2 Connect to EC2

```bash
ssh -i key.pem ec2-user@EC2_PUBLIC_IP
```

---

## 3 Install Node.js

```bash
sudo dnf update -y
sudo dnf install nodejs git -y
```

Verify installation:

```bash
node -v
npm -v
```

---

## 4 Clone the Project

```bash
cd ~
git clone https://github.com/AnujTanwar2004/ModelDeployment.git
cd ModelDeployement
```
```if error happens sudo chown -R ec2-user:ec2-user /home/ec2-user```
---

## 5 Install Dependencies

```bash
npm install
```

---

## 6 Configure Environment Variables

Create `.env`.
Using `nano .env`
Use ctrl+X
```env
PORT=3000
AWS_REGION=ap-south-1
SAGEMAKER_ENDPOINT_NAME=iris-endpoint-103616
AWS_ACCESS_KEY_ID=YOUR_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET
```

---

## 7 Start the Server

```bash
node server.js
```

Expected output:

```
Server listening on port 3000
```

---

## 8 Access the Website

Open browser:

```
http://EC2_PUBLIC_IP:3000
```

---

# Part 3 — API Flow

1. User enters flower measurements.
2. Frontend sends request to Node API.

Example request:

```
POST /predict
```

Body:

```json
{
 "data": [5.1,3.5,1.4,0.2]
}
```

3. Node server calls SageMaker endpoint.

4. SageMaker returns prediction.

Example response:

```json
{
 "prediction": "setosa"
}
```

5. Website displays the predicted species.

---

# Useful Commands

Start server:

```
node server.js
```

Restart server:

```
pm2 restart server
```

Check logs:

```
pm2 logs
```

---

# Clean Up (Avoid AWS Charges)

Delete endpoint after testing.

```python
predictor.delete_endpoint()
predictor.delete_model()
```

---

# Conclusion

This project demonstrates:

* Training a model in **Amazon SageMaker**
* Deploying a real-time inference endpoint
* Hosting a **Node.js web application on EC2**
* Calling the SageMaker API from the website
* Displaying predictions to the user

The architecture integrates **Machine Learning with Cloud Web Deployment** using AWS services.
