import React, { useState, useEffect } from 'react';

const MessageStats = ({ data }) => {
    const [messagesPerMonth, setMessagesPerMonth] = useState({});
    const [wordFrequencies, setWordFrequencies] = useState({});
    const [loveCount, setLoveCount] = useState(0);

    useEffect(() => {
        const messageMap = {};
        const wordMap = {};
        let loveCounter = 0;

        data.forEach((msg) => {
            // Assuming msg has fields 'timestamp', 'content', 'author'
            const date = new Date(msg.timestamp);
            const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;

            // Count messages per month
            if (!messageMap[monthYear]) {
                messageMap[monthYear] = 0;
            }
            messageMap[monthYear] += 1;

            // Count word frequencies
            const words = msg.content.split(" ");
            words.forEach((word) => {
                const sanitizedWord = word.toLowerCase().replace(/[^\w]/g, "");
                if (!wordMap[sanitizedWord]) {
                    wordMap[sanitizedWord] = 0;
                }
                wordMap[sanitizedWord] += 1;

                // Count "I love you"
                if (sanitizedWord.includes("love") && msg.content.toLowerCase().includes("i love you")) {
                    loveCounter += 1;
                }
            });
        });

        setMessagesPerMonth(messageMap);
        setWordFrequencies(wordMap);
        setLoveCount(loveCounter);
    }, [data]);

    return (
        <div>
            <h2>Message Stats</h2>
            <p>Total 'I love you' Count: {loveCount}</p>
        </div>
    );
};

export default MessageStats;