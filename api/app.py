from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import os
import joblib
import traceback
import pickle

app = Flask(__name__)
CORS(app)

# --- SOLUTION: Construct an absolute path to the model file ---
# This makes the path reliable in any server environment.
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATHS = [
    os.path.join(BASE_DIR, "diabetes_rf_model.joblib"),
    os.path.join(BASE_DIR, "diabetes_rf_model.pkl"),
]

model = None

def load_model():
    global model
    for p in MODEL_PATHS:
        if os.path.exists(p):
            try:
                model = joblib.load(p)
                print(f"Loaded model from {p} (joblib.load)")
                return
            except Exception as e_job:
                print(f"joblib.load failed for {p}: {e_job}")
                try:
                    with open(p, "rb") as f:
                        model = pickle.load(f)
                    print(f"Loaded model from {p} using pickle")
                    return
                except Exception as e_pickle:
                    print(f"pickle.load failed for {p}: {e_pickle}")
    # If the loop completes without loading a model, raise an error.
    raise FileNotFoundError("No model file found in the 'api' directory. Place 'diabetes_rf_model.joblib' or '.pkl' next to app.py")

# Basic expected columns (match your frontend)
COLUMNS = [
  'Age', 'Gender', 'Polyuria', 'Polydipsia', 'sudden weight loss', 'weakness',
  'Polyphagia', 'Genital thrush', 'visual blurring', 'Itching', 'Irritability',
  'delayed healing', 'partial paresis', 'muscle stiffness', 'Alopecia', 'Obesity'
]

def preprocess_input(data: dict) -> pd.DataFrame:
    row = {}
    for c in COLUMNS:
        # Use .get() for safer dictionary access
        row[c] = data.get(c)

    df = pd.DataFrame([row])

    # encode object columns: Yes->1, No->0, Male->1, Female->0
    for col in df.columns:
        if df[col].dtype == "object":
            df[col] = df[col].replace({"Yes": 1, "No": 0, "Male": 1, "Female": 0})

    # Ensure all columns are numeric, coercing errors
    for col in df.columns:
         df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)

    return df

@app.route("/api/predict", methods=["POST"])
def predict():
    global model
    try:
        # Load the model once on the first request.
        if model is None:
            load_model()

        payload = request.get_json(force=True)
        df = preprocess_input(payload)

        # Ensure column order matches the model's expectation
        df = df[COLUMNS]

        # Get probability of the positive class (class 1)
        proba = model.predict_proba(df)
        prob_positive = float(proba[0, 1]) # Probability of diabetes

        return jsonify({
            "probability_positive": prob_positive
        })
    except FileNotFoundError as fnf:
        print(traceback.format_exc())
        return jsonify({"error": str(fnf)}), 500
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": "Prediction failed due to an internal error.", "details": str(e)}), 500

# This is a helpful route for checking if the API is running
@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"})
