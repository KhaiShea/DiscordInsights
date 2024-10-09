import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const processMessages = (data) => {
    const months = {};

    data.forEach((msg) => {
        const date = new Date(msg[2]); // Assuming the timestamp is in the 3rd column (index 2)
        if (!isNaN(date.getTime())) {
            const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            if (!months[month]) {
                months[month] = 0;
            }
            months[month] += 1;
        } else {
            console.warn("Invalid date:", msg[2]); // Log invalid dates
        }
    });

    return months;
};

const Visualizations = ({ data }) => {
    const monthsData = processMessages(data);

    // Prepare chart data
    const chartData = {
        labels: Object.keys(monthsData),
        datasets: [
            {
                label: 'Messages Per Month',
                data: Object.values(monthsData),
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    return (
        <div className="box">
            <h3 className="title is-4">Message Trends</h3>
            <div className="columns">
                <div className="column">
                    {Object.keys(monthsData).length === 0 ? (
                        <p>No valid data found for charting trends.</p>
                    ) : (
                        <Line data={chartData} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Visualizations;
