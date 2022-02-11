import React from 'react';

const Total = (props) => {
    return (
        <div>
            {props.course[0].exercises + props.course[1].exercises + props.course[2].exercises}
        </div>
    );
};

export default Total;