# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.utils import shuffle
from sklearn.metrics import classification_report
import pandas as pd
import numpy as np

app = Flask(__name__)
cors = CORS(app, support_credentials=True)

# Initial parameters
initial_params = {
    'activation': 'relu',
    'alpha': 0.05,
    'hidden_layer_sizes': (10, 30, 10),
    'learning_rate': 'constant',
    'solver': 'adam',
    'max_iter': 1000,  # Increase max_iter
    'random_state': 42,
    'warm_start': True  # Use warm_start
}

clf = MLPClassifier(**initial_params)
scaler = MinMaxScaler()  # Instantiate MinMaxScaler

def train():
    try:
        # Load the diabetes dataset from CSV
        print("Loading the dataset")
        diabetes_df = pd.read_csv('diabetes.csv')

        # Separate features (X) and target variable (y)
        X = diabetes_df.drop('Outcome', axis=1)
        y = diabetes_df['Outcome']

        # Shuffle the data
        X, y = shuffle(X, y, random_state=42)

        # Standardize the features using StandardScaler
        X = scaler.fit_transform(X)

        # Split the data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Hyperparameter tuning using GridSearchCV with parallel processing
        param_grid = {
            'alpha': [0.01, 0.05, 0.1],
            'hidden_layer_sizes': [(10,), (20,), (30,), (10, 20, 10), (20, 30, 20)],
            'learning_rate': ['constant', 'invscaling', 'adaptive'],
        }

        grid_search = GridSearchCV(
            clf, param_grid, cv=5, n_jobs=-1, scoring='accuracy'
        )
        grid_search.fit(X_train, y_train)

        best_params = grid_search.best_params_
        print("Best Parameters:", best_params)

        # Update the classifier with the best parameters
        clf.set_params(**best_params)

        # Train the MLP classifier
        print("Train the MLP classifier")
        clf.fit(X_train, y_train)

        # Evaluate the model
        y_pred = clf.predict(X_test)
        print("Classification Report:")
        print(classification_report(y_test, y_pred))

    except Exception as e:
        return jsonify({'error': str(e)})



@app.route('/predict', methods=['POST'])
@cross_origin(origin='*',headers=['Content- Type','Authorization'], supports_credentials=True)

def predict():
    try:
        # Get the data from the request
        data = request.get_json()

        # Extract the feature values directly from the 'data' key
        features = np.array([
            data['Pregnancies'],
            data['Glucose'],
            data['BloodPressure'],
            data['SkinThickness'],
            data['Insulin'],
            data['BMI'],
            data['DiabetesPedigreeFunction'],
            data['Age']
        ], dtype=float)

        # Normalize the features using the same scaler used during training
        normalized_features = scaler.transform([features])

        # Make the prediction using the raw model without transformation
        raw_prediction = clf.predict(normalized_features)[0]
        print("Raw Prediction:", raw_prediction)

        
        # Use a threshold (e.g., 0.5) to convert probability to binary prediction
        prediction = int(raw_prediction > 0.5)
        print("Binary Prediction:", prediction)

        response = jsonify({'prediction': int(prediction), 'raw_prediction': float(raw_prediction)})

        #response.headers.add('Access-Control-Allow-Origin', '*')

        return response
    except Exception as e:
        return jsonify({'error': str(e)})



if __name__ == '__main__':
    train()
    app.run(debug=True, host='0.0.0.0')
