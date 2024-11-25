import PropTypes from 'prop-types';
import StatisticsLine from './StatisticsLine.jsx';

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad;
    const average = (good - bad) / all;
    const positive = (good / all) * 100;

    return (
        <table>
            <tbody>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="all" value={all} />
            <StatisticsLine text="average" value={average.toFixed(2)} />
            <StatisticsLine text="positive" value={`${positive.toFixed(2)}%`} />
            </tbody>
        </table>
    );
};

Statistics.propTypes = {
    good: PropTypes.number.isRequired,
    neutral: PropTypes.number.isRequired,
    bad: PropTypes.number.isRequired,
};

export default Statistics;