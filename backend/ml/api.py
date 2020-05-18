import os
import pickle
from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import numpy as np
import pandas as pd
app = Flask(__name__)
CORS(app)
api = Api(app)
# Require a parser to parse our POST request.
parser = reqparse.RequestParser()
parser.add_argument("listingRegion")
parser.add_argument("buildingSize")
parser.add_argument("landSize")
# Unpickle our model so we can use it!
if os.path.isfile("rf_house.pkl"):
  model = pickle.load(open("rf_house.pkl", "rb"))
class Predict(Resource):
  def post(self):
    args = parser.parse_args()
# Sklearn is VERY PICKY on how you put your values in...
    X_pred = pd.DataFrame([['Jakarta', 360, 360]], columns=['listingRegion', 'buildingSize', 'landSize'])
    prediction = model.predict(X_pred)[0]

    return {"price": prediction}
api.add_resource(Predict, "/predict")
if __name__ == "__main__":
  app.run(debug=True)