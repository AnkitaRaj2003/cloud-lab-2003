import json
import joblib
import os
import numpy as np

def init():
    global model
    model_path = os.path.join(os.getenv("AZUREML_MODEL_DIR"), "model.pkl")
    model = joblib.load(model_path)

def run(raw_data):
    data = json.loads(raw_data)
    prediction = model.predict(np.array(data))
    return prediction.tolist()
