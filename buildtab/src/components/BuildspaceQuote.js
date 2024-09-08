import React from 'react';

const BuildspaceQuote = () => {
    const quotes = [
        "Believe you can and you're halfway there.",
        "The only limit to our realization of tomorrow is our doubts of today.",
        "You are never too old to set another goal or to dream a new dream."
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <div className="border border-gray-300 text-2xl font-semibold text-gray-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2">
            <p>{randomQuote}</p>
        </div>
    );
};

export default BuildspaceQuote;
