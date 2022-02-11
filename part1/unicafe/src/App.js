import React, {useState} from 'react'
import Statistics from "./components/Statistics";

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleSetGood = () => {
        setGood(good + 1);
    }
    const handleSetNeutral = () => {
        setNeutral(neutral + 1);
    }
    const handleSetBad = () => {
        setBad(bad + 1);
    }

    return (
        <div>
            <Statistics setGood={handleSetGood} setNeutral={handleSetNeutral} setBad={handleSetBad} good={good}
                        neutral={neutral} bad={bad} text={"give feedback"}/>

        </div>
    )
}

export default App