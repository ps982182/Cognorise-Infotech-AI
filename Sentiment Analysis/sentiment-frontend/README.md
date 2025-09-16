# Twitter Sentiment Analysis

A web application that analyzes the sentiment of tweets in real-time using state-of-the-art BERT-based models and provides interactive visualizations.

## Features

- Analyze tweet text for positive or negative sentiment using a transformer (BERT) model.
- History table of analysed tweets with sentiment labels.
- Interactive pie, bar, and line charts to visualize sentiment distribution and trends.
- Responsive, user-friendly React frontend with Bootstrap styling.
- Flask backend serving the sentiment model with Hugging Face Transformers.
- Easy to deploy on free cloud platforms like Heroku (backend) and Vercel/Netlify (frontend).

## Technologies Used

- Python, Flask, Flask-CORS
- Hugging Face Transformers (DistilBERT)
- React.js, react-chartjs-2, Chart.js
- Bootstrap 5
- Axios (for API communication)

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js and npm/yarn
- Git

### Backend Setup

1. Clone this repository and navigate to the backend folder (if separate).

2. Create and activate a virtual environment:

```
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
```

3. Install backend dependencies:

```
pip install -r requirements.txt
```

4. Run the Flask backend server:

```
python app.py
```

### Frontend Setup

1. Navigate to the frontend folder:

```
cd sentiment-frontend
```

2. Install frontend dependencies:

```
npm install
```

3. Start the React development server:

```
npm start
```

The frontend will run on `http://localhost:3000` and communicate with the backend `http://localhost:5000`.

## Usage

- Enter tweet text in the input box.
- Click **Analyze** to get sentiment prediction.
- View history and interactive charts below.

## Deployment

- Backend can be deployed on Heroku (Python/Flask).
- Frontend can be deployed on Vercel or Netlify.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.

## Author

Prajakta Singhal  
© 2026 Prajakta Singhal. All Rights Reserved.

```


```
