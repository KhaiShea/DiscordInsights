import React, { useState } from 'react';
import Upload from './components/Upload';
import MessageStats from './components/MessageStats';
import Visualizations from './components/Visualizations';

function App() {
    const [data, setData] = useState([]);

    const handleDataLoaded = (uploadedData) => {
        setData(uploadedData);
    };

    return (
        <div className="container">
            <section className="section">
                <h1 className="title">Discord Message Analyzer</h1>
                <p className="subtitle">Upload your messages and explore the data!</p>
            </section>

            <section className="section">
                <Upload onDataLoaded={handleDataLoaded} />
            </section>

            {data.length > 0 && (
                <>
                    <section className="section">
                        <MessageStats data={data} />
                    </section>

                    <section className="section">
                        <Visualizations data={data} />
                    </section>
                </>
            )}
        </div>
    );
}

export default App;