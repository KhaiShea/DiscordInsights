import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(...registerables);

const App = () => {
    const [messages, setMessages] = useState([]);
    const [totalMessages, setTotalMessages] = useState(0);
    const [messagesPerMonth, setMessagesPerMonth] = useState({});
    const [uploaded, setUploaded] = useState(false);

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                parseMessages(text);
            };
            reader.readAsText(file);
        }
    };

    const parseMessages = (text) => {
        const rows = text.split('\n');
        const parsedMessages = rows.map((row) => {
            const [id, username, timestamp, content] = row.split(',');
            return { id, username, timestamp, content };
        });

        setMessages(parsedMessages);
        setTotalMessages(parsedMessages.length);
        calculateMessagesPerMonth(parsedMessages);
        setUploaded(true);
    };

    const calculateMessagesPerMonth = (messages) => {
        const monthCounts = {};
        messages.forEach((message) => {
            const date = new Date(message.timestamp);
            const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
            monthCounts[monthYear] = (monthCounts[monthYear] || 0) + 1;
        });
        setMessagesPerMonth(monthCounts);
    };

    const getChartData = () => {
        const labels = Object.keys(messagesPerMonth);
        const data = Object.values(messagesPerMonth);

        return {
            labels,
            datasets: [
                {
                    label: 'Messages Per Month',
                    data,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="is-size-1">Discord Message Insights</h1>
                <input type="file" accept=".csv" onChange={handleUpload} />
                <div>
                    {uploaded && <h2>Message Statistics</h2>}
                    {uploaded && <p>Total Messages: {totalMessages}</p>}
                </div>
                <h2>Message Trends</h2>
                {Object.keys(messagesPerMonth).length > 0 ? (
                    <Bar data={getChartData()} />
                ) : (
                    <p>No valid data found for charting trends.</p>
                )}
            </header>
        </div>
    );
};

export default App;
