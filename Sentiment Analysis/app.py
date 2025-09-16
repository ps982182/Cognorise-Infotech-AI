# from flask import Flask, request, jsonify
# import pickle
# import re
# import nltk
# from nltk.corpus import stopwords

# app = Flask(__name__)
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Load model and vectorizer
# with open('model.pkl', 'rb') as f:
#     model = pickle.load(f)
# with open('vectorizer.pkl', 'rb') as f:
#     vectorizer = pickle.load(f)

# nltk.download('stopwords')
# stop_words = set(stopwords.words('english'))

# def preprocess(text):
#     text = text.lower()
#     text = re.sub(r'http\S+|www\S+|https\S+', '', text)
#     text = re.sub(r'\@\w+|\#','', text)
#     text = re.sub(r'[^a-z\s]', '', text)
#     tokens = text.split()
#     filtered_tokens = [word for word in tokens if word not in stop_words]
#     return ' '.join(filtered_tokens)

# @app.route('/', methods=['GET'])
# def home():
#     return "Sentiment Analysis API is running!", 200

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.get_json()
#     text = data.get('text', '')
#     if text == '':
#         return jsonify({'error': 'Empty input text'}), 400

#     clean_text = preprocess(text)
#     vect = vectorizer.transform([clean_text])
#     pred = model.predict(vect)[0]
#     sentiment = 'positive' if pred == 1 else 'negative'

#     return jsonify({'sentiment': sentiment})

# if __name__ == '__main__':
#     app.run(debug=True)





from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Load pretrained sentiment-analysis pipeline (DistilBERT fine-tuned)
sentiment_analyzer = pipeline("sentiment-analysis")

@app.route('/', methods=['GET'])
def home():
    return "Sentiment Analysis API with BERT is running!", 200

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get('text', '').strip()
    if not text:
        return jsonify({'error': 'Empty input text'}), 400

    # Use BERT pipeline to predict sentiment
    results = sentiment_analyzer(text)
    # results example: [{'label': 'POSITIVE', 'score': 0.9998}]

    label = results[0]['label'].lower()  # 'positive' or 'negative'

    return jsonify({'sentiment': label})

if __name__ == '__main__':
    app.run(debug=True)
