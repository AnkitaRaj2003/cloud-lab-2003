import joblib
import json
import os

def model_fn(model_dir):
    return joblib.load(os.path.join(model_dir, "model.joblib"))

def input_fn(request_body, content_type):
    return json.loads(request_body)

def predict_fn(input_data, model):
    return model.predict([input_data]).tolist()

def output_fn(prediction, content_type):
    return json.dumps(prediction)
