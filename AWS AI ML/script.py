import joblib
import numpy as np


# load model
def model_fn(model_dir):
    model = joblib.load(model_dir + "/model.joblib")
    return model


# make prediction
def predict_fn(input_data, model):
    prediction = model.predict(input_data)
    return prediction
