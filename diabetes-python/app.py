# app.py
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.utils import shuffle
from sklearn.metrics import classification_report
import pandas as pd
import numpy as np
import shap


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

# Load the diabetes dataset from CSV
print("Loading the dataset")
diabetes_df = pd.read_csv('diabetes.csv')
# Separate features (X) and target variable (y)
X = diabetes_df.drop('Outcome', axis=1)
y = diabetes_df['Outcome']
# Shuffle the data
X, y = shuffle(X, y, random_state=42)
# Standardize the features using StandardScaler
feature_names = X.columns.tolist()
X = scaler.fit_transform(X)
# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

def train():
    try:
       

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
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'], supports_credentials=True)

def predict():
    try:

        def predict_function(X):
            return clf.predict_proba(X)[:, 1]

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

        # Use predict_proba instead of predict
        probability_estimate = clf.predict_proba(normalized_features)[0]
        print("Probability Estimate:", probability_estimate)

        # Test using shap
        explainer = shap.KernelExplainer(predict_function, data=X_train)
        shap_values = explainer.shap_values(normalized_features)

        # Convert NumPy arrays to lists
        shap_values_list = shap_values[0].tolist()

        # Calculate absolute values and total_shap
        absolute_values = [abs(value) for value in shap_values_list]
        total_shap = sum(absolute_values)

        # Calculate percentage contributions
        percentage_contributions = [value / total_shap *100 for value in absolute_values]

        # Create a dictionary to store feature names and percentage contributions
        feature_contributions = {feature: percentage for feature, percentage in zip(feature_names, percentage_contributions)}
        

        
        formatted_feature_contributions = "\n".join([f"{feature}: <strong>{percentage:.2f}%</strong>" for feature, percentage in feature_contributions.items()])




        # Extract the probability associated with the positive class
        probability_1 = confidence = probability_estimate[1]

        # Use a threshold (e.g., 0.5) to convert probability to binary prediction
        prediction = int(probability_1 > 0.5)
        print("Binary Prediction:", prediction)

        if prediction:
            confidence = probability_estimate[1]
        else:
            confidence = probability_estimate[0]

        formatted_confidence = "{:.2%}".format(confidence)

        response = make_response(jsonify({'prediction': int(prediction),'feature_contributions': formatted_feature_contributions, 'confidence': "The Prediction Confidence is: {:.2%}".format(confidence)}))


        # Set headers for preflight requests
        #response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        #response.headers.add('Access-Control-Allow-Methods', 'POST')
        #response.headers.add('Access-Control-Allow-Origin', '*')

        return response
    except Exception as e:
        return jsonify({'error': str(e)})



if __name__ == '__main__':
    train()
    app.run(debug=True, host='0.0.0.0')
