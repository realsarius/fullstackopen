import React from 'react';

const StatisticLine = ({text, value}) => {
    if (text === "positive") {
        return (
            <table>
                <tbody>
                <tr>
                    <td>{text}</td>
                    <td>{value} %</td>
                </tr>
                </tbody>
            </table>
        )
    }
    return (
        <table>
            <tbody>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
            </tbody>
        </table>
    );
};

export default StatisticLine;