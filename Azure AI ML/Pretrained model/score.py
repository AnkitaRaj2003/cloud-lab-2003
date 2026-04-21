import json
import joblib
import os
import tarfile
import numpy as np

def init():
    global model
    
    model_dir = os.getenv("AZUREML_MODEL_DIR")
    tar_path = os.path.join(model_dir, "model.tar.gz")

    # extract tar.gz
    with tarfile.open(tar_path) as tar:
        tar.extractall(model_dir)

    # load extracted model file
    model = joblib.load(os.path.join(model_dir, "model.pkl"))

def run(raw_data):
    data = json.loads(raw_data)
    prediction = model.predict(np.array(data))
    return prediction.tolist()
