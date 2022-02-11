import React from 'react';
import Button from "./Button";
import StatisticLine from "./StatisticLine";

const Statistics = ({setGood, good, bad, setBad, neutral, setNeutral, text}) => {
    if (good + neutral + bad === 0) {
        return (
            <div>
                <h1>{text}</h1>
                <Button onClick={() => setGood(good + 1)} text={"good"}/>
                <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"}/>
                <Button onClick={() => setBad(bad + 1)} text={"bad"}/>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    }
    return (
        <div>
            <h1>{text}</h1>
            <Button onClick={() => setGood(good + 1)} text={"good"}/>
            <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"}/>
            <Button onClick={() => setBad(bad + 1)} text={"bad"}/>
            <h1>statistics</h1>
            <StatisticLine text={"good"} value={good}/>
            <StatisticLine text={"neutral"} value={neutral}/>
            <StatisticLine text={"bad"} value={bad}/>
            <StatisticLine text={"all"} value={good + neutral + bad}/>
            <StatisticLine text={"average"} value={((good - bad) / (good + neutral + bad)).toFixed(1)}/>
            <StatisticLine text={"positive"} value={good / (good + neutral + bad) * 100}/>

        </div>
    );
};

export default Statistics;