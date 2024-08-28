# Diabetes Prediction WebApp Documentation

## Overview
This repository contains a web application that predicts the likelihood of diabetes based on user input data. The application is built using a machine learning model trained on the Diabetes toy dataset. The tech stack used includes Flask for the backend REST API, React.js for the frontend, and SciKit Learn for the machine learning model.

## Table of Contents
1. [Architecture](#architecture)
2. [Machine Learning Model](#machine-learning-model)
3. [Backend - Flask API](#backend---flask-api)
4. [Frontend - React.js](#frontend---reactjs)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Conclusion](#conclusion)

## Architecture
The application follows a typical web application architecture with a clear separation between the frontend and backend:
- **Frontend:** Developed using React.js, it provides a user interface for entering data and viewing predictions.
- **Backend:** A Flask application serving as a REST API that handles incoming data, processes it using the machine learning model, and returns the prediction.
- **Machine Learning:** The model is trained using the Diabetes dataset with optimization performed using `GridSearchCV`.

## Machine Learning Model
- **Dataset:** The application uses the Diabetes dataset, loaded from a CSV file.
- **Preprocessing:** Features are normalized using `StandardScaler`, and data is split into training and test sets with an 80/20 ratio.
- **Model Training:** A Multi-layer Perceptron (MLP) classifier is used, and the best parameters are found using `GridSearchCV`.
- **Accuracy:** The model achieves approximately 85% accuracy.

## Backend - Flask API
The Flask backend provides a RESTful API that:
- Receives user input via a POST request to `/predict`.
- Normalizes the input data using the same scaler used during model training.
- Predicts the probability of diabetes using the trained model.
- Returns the prediction as a JSON response.

### Example API Endpoint
```python
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = np.array([data['Pregnancies'], data['Glucose'], data['BloodPressure'],
                         data['SkinThickness'], data['Insulin'], data['BMI'], 
                         data['DiabetesPedigreeFunction'], data['Age']], dtype=float)
    normalized_features = scaler.transform([features])
    prediction = clf.predict_proba(normalized_features)[0]
    return jsonify({'prediction': int(prediction)})
```

## Frontend - React.js
The React.js frontend allows users to input relevant health data and submit it for prediction. The interface consists of:
- **Input Fields:** 8 fields corresponding to the features used by the model (e.g., glucose level, blood pressure).
- **Submit Button:** To send the data to the backend and receive a prediction.
- **Result Display:** The predicted likelihood of diabetes is displayed on the page after submission.

## Installation
To set up the project locally:
1. **Clone the repository:**
   ```bash
   git clone https://github.com/miselve/DiabetesPrediction.git
   cd DiabetesPrediction
   ```
2. **Backend:**
   - Create a virtual environment and install dependencies:
     ```bash
     cd diabetes-python
     python3 -m venv venv
     source venv/bin/activate
     pip install -r requirements.txt
     ```
   - Run the Flask application:
     ```bash
     flask run
     ```
3. **Frontend:**
   - Navigate to the `diabetes-prediction-react` directory and install dependencies:
     ```bash
     cd diabetes-prediction-react
     npm install
     ```
   - Start the React development server:
     ```bash
     npm start
     ```
     ### Important
      * **Modify the API Endpoint URL:** Update the App.js (`/diabetes-prediction-react/src/App.js`) @ Line 26 according to your Flask API Address.


## Usage
1. **Open the application:** Navigate to `http://localhost:3000` in your web browser.
2. **Enter data:** Fill in the required fields with your health metrics.
3. **Submit:** Click the submit button to receive a prediction.

## Conclusion
This project was created by Michael Selvesakis to demonstrate the deployment of a machine learning model as a WebApp in the realms of "Neural Networks" which was part of Democritus University of Thrace's curriculum.

For any questions or contributions, please feel free to contact the author or open an issue in the repository.
