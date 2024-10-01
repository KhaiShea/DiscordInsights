import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';

const Visualizations = ({ messagesPerMonth, wordFrequencies }) => {
    const months = Object.keys(messagesPerMonth);
    const messageCounts = Object.values(messagesPerMonth);

    const chartData = {
        labels: months,
        datasets: [
            {
                label: 'Messages Per Month',
                data: messageCounts,
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    return (
        <div>
            <h2>Message Insights</h2>
            <Line data={chartData} />

            {/* You can add more charts for other data like word frequencies */}
        </div>
    );
};

export default Visualizations;