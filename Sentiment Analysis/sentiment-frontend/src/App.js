import React, { useState } from "react";
import axios from "axios";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarController,
  PieController,
  LineController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarController,
  PieController,
  LineController
);

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", { text });
      setResult(res.data.sentiment);
      setHistory((prev) => [...prev, { text, sentiment: res.data.sentiment }]);
    } catch (error) {
      setResult("Error communicating with server");
    }
  };

  const positiveCount = history.filter(
    (h) => h.sentiment === "positive"
  ).length;
  const negativeCount = history.filter(
    (h) => h.sentiment === "negative"
  ).length;

  const pieData = {
    labels: ["Positive", "Negative"],
    datasets: [
      {
        label: "Sentiment Distribution",
        data: [positiveCount, negativeCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: ["Positive", "Negative"],
    datasets: [
      {
        label: "Number of Tweets",
        data: [positiveCount, negativeCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const lineData = {
    labels: history.map((_, idx) => idx + 1),
    datasets: [
      {
        label: "Sentiment Trend (1=Positive, 0=Negative)",
        data: history.map((h) => (h.sentiment === "positive" ? 1 : 0)),
        fill: false,
        borderColor: "#36A2EB",
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <div className="container mt-5" style={{ maxWidth: "750px" }}>
        <h2 className="mb-4 text-center">Twitter Sentiment Analysis</h2>
        <input
          className="form-control mb-3"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter tweet text..."
        />
        <button
          className="btn btn-primary d-grid w-100 mb-3"
          onClick={handleSubmit}
        >
          Analyze
        </button>

        {result && (
          <div
            className={`alert text-center alert-${
              result === "positive" ? "success" : "danger"
            }`}
          >
            Sentiment: <strong>{result}</strong>
          </div>
        )}

        {history.length > 0 && (
          <>
            <h5 className="mb-3">Analysis History</h5>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Tweet</th>
                  <th>Sentiment</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={i}>
                    <td>{h.text}</td>
                    <td>
                      <span
                        className={`badge bg-${
                          h.sentiment === "positive" ? "success" : "danger"
                        }`}
                      >
                        {h.sentiment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mb-4">
              <h5>Sentiment Distribution (Pie Chart)</h5>
              <Pie data={pieData} />
            </div>

            <div className="mb-4">
              <h5>Number of Tweets per Sentiment (Bar Chart)</h5>
              <Bar data={barData} />
            </div>

            <div className="mb-4">
              <h5>Sentiment Trend Over Inputs (Line Chart)</h5>
              <Line data={lineData} />
            </div>
          </>
        )}
      </div>

      <footer className="footer-sticky">
        © 2026 Prajakta Singhal. All Rights Reserved.
      </footer>
    </>
  );
}

export default App;
