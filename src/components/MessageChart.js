import React, { useEffect, useRef } from 'react';
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
} from 'chart.js';

// Register all necessary components globally
Chart.register(CategoryScale, LinearScale, BarController, BarElement);

const MessageChart = ({ chartData }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null); // useRef to hold the chart instance

    useEffect(() => {
        // Destroy the chart instance if it exists to avoid errors
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Create a new chart instance
        chartInstance.current = new Chart(chartRef.current, {
            type: 'bar',
            data: chartData,
            options: {
                scales: {
                    x: {
                        type: 'category',
                        title: {
                            display: true,
                            text: 'Month',
                        },
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Message Count',
                        },
                    },
                },
            },
        });

        return () => {
            // Cleanup on unmount
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [chartData]);

    return <canvas ref={chartRef} style={{ height: '400px', width: '100%' }} />;
};

export default MessageChart;
