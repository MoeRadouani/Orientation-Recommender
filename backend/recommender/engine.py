import joblib
import numpy as np
import pandas as pd
import os

# ======================================================
# Load model artifact
# ======================================================
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "model", "academic_recommendation_model.pkl")

artifacts = joblib.load(MODEL_PATH)

model = artifacts["model"]
scaler = artifacts["scaler"]
label_encoder = artifacts["label_encoder"]
feature_names = artifacts["feature_names"]

# ======================================================
# Core prediction function
# ======================================================

def predict_recommendation(user_inputs: dict):
    """
    user_inputs: dict with 8 raw subject grades
    returns: (domain, confidence, probabilities_df)
    """

    # ------------------------------
    # 1. Normalize input keys
    # ------------------------------
    data = {k.strip().lower(): float(v) for k, v in user_inputs.items()}

    # ------------------------------
    # 2. Required raw features
    # ------------------------------
    required_grades = [
        "java",
        "python",
        "database",
        "web_dev",
        "networks",
        "machine_learning",
        "cybersecurity",
        "mobile_dev"
    ]

    for feature in required_grades:
        if feature not in data:
            raise ValueError(f"Missing required input feature: {feature}")

    # ------------------------------
    # 3. Compute engineered features
    # ------------------------------
    data["gpa"] = np.mean([data[f] for f in required_grades])

    data["avg_programming"] = (data["java"] + data["python"]) / 2
    data["avg_data"] = (data["database"] + data["machine_learning"]) / 2
    data["avg_security"] = (data["cybersecurity"] + data["networks"]) / 2
    data["avg_development"] = (data["web_dev"] + data["mobile_dev"]) / 2

    data["grade_std"] = np.std([data[f] for f in required_grades])

    # ------------------------------
    # 4. Build DataFrame in training order
    # ------------------------------
    X = pd.DataFrame([data])

    try:
        X = X[feature_names]
    except KeyError as e:
        raise ValueError(f"Model expects feature not computed: {e}")

    # ------------------------------
    # 5. Scale
    # ------------------------------
    X_scaled = scaler.transform(X)

    # ------------------------------
    # 6. Predict
    # ------------------------------
    pred_class = model.predict(X_scaled)[0]
    domain = label_encoder.inverse_transform([pred_class])[0]

    confidence = None
    probabilities_df = None

    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(X_scaled)[0]
        confidence = float(np.max(probs))

        probabilities_df = pd.DataFrame({
            "Domain": label_encoder.classes_,
            "Probability": probs
        }).sort_values("Probability", ascending=False)
    explanations = generate_explanation(data)

    return domain, confidence, probabilities_df, explanations

def generate_explanation(data: dict):
    explanations = []

    if data["machine_learning"] >= 15 and data["python"] >= 15:
        explanations.append("Strong performance in Machine Learning and Python")

    if data["avg_programming"] >= 15:
        explanations.append("High programming proficiency")

    if data["avg_data"] >= 15:
        explanations.append("Good data-related skills (Databases & ML)")

    if data["avg_security"] >= 15:
        explanations.append("Strong cybersecurity and networking background")

    if data["grade_std"] < 2:
        explanations.append("Consistent academic performance across subjects")

    if not explanations:
        explanations.append("Balanced academic profile across multiple domains")

    return explanations
