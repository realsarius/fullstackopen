import React from 'react';

const Part = (props) => {

    return (
        <div>
            {props.course.name} {props.course.exercises}
        </div>
    )
}

const Content = (props) => {

    return (
        <div>
            <Part course={props.course[0]} />
            <Part course={props.course[1]} />
            <Part course={props.course[2]} />
        </div>
    );
};

export default Content;