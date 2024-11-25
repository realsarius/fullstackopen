import Title from './components/Title.jsx';
import Statistics from './components/Statistics.jsx';
import Button from './components/Button.jsx';
import { useSelector } from 'react-redux';
import store from './store/store';

const App = () => {

    const good = useSelector((state) => state.good);
    const neutral = useSelector((state) => state.ok);
    const bad = useSelector((state) => state.bad);

    return (
        <div className={'testing-zone'}>
            <Title text="give feedback" />
            <Button handleClick={() => store.dispatch({ type: 'GOOD' })} text="good" />
            <Button handleClick={() => store.dispatch({ type: 'OK' })} text="neutral" />
            <Button handleClick={() => store.dispatch({ type: 'BAD' })} text="bad" />
            <Button handleClick={() => store.dispatch({ type: 'ZERO' })} text="reset stats" />

            <Title text="statistics" />
            {(good + neutral + bad === 0) ? (
                <p>No feedback given</p>
            ) : (
                <Statistics good={good} neutral={neutral} bad={bad} />
            )}
        </div>

    );
};

export default App;
