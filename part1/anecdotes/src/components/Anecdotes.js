import React from 'react';

const Anecdotes = ({text, anecdotes, points, selected}) => {
    return (
        <div>
            <h1>{text}</h1>
            <p>{anecdotes[selected]}</p>
            <p>has {points[selected]} votes</p>
        </div>
    );
};

export default Anecdotes;