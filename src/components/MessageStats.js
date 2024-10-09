import React from 'react';

const MessageStats = ({ data }) => {
    return (
        <div className="box">
            <h3 className="title is-4">Message Statistics</h3>
            <div className="content">
                <p><strong>Total Messages: </strong> {data.length}</p>
            </div>
        </div>
    );
};

export default MessageStats;
