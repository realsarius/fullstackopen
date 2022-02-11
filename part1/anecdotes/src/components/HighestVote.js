import React from 'react';

const HighestVote = ({points, anecdotes}) => {
    const highestVotePoint = Math.max(...points);
    const highestVoteIndex = points.indexOf(highestVotePoint);
    const highestAnecdote = anecdotes[highestVoteIndex];
    if (highestAnecdote === 0) {
        return (
            <p>No votes yet</p>
        )
    }

    return (
        <div>
            <h1>Anecdote with most votes</h1>
            <p>{highestAnecdote}</p>
            <p>has {highestVotePoint} votes</p>
        </div>
    )
};

export default HighestVote;