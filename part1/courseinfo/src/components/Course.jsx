import PropTypes from "prop-types";

const Part = (props) => {

    const {part} = props;

    return <p>{part.name} {part.exercises}</p>
}

const Header = (props) => {
    return (
        <h2>{props.course}</h2>
    )
}

const Content = (props) => {
    const {parts} = props;

    return (
        <div>
            {parts && parts.map((part, index) => (
                <Part key={index} part={part}/>
            ))}
        </div>
    )
}

const Total = (props) => {
    const {parts} = props;

    const total = parts.reduce((accumulator, part) => accumulator + part.exercises, 0)

    return <p><b>total of {total} exercises</b></p>
}

const Course = ({name, parts}) => {

    return (
        <div>
            <Header course={name}/>
            <Content parts={parts}/>
            <Total parts={parts}/>
        </div>
    )

}

Course.propTypes = {
    name: PropTypes.string.isRequired,
    parts: PropTypes.array.isRequired
}

Part.propTypes = {
    part: PropTypes.object.isRequired,
}

Header.propTypes = {
    course: PropTypes.string
}

Content.propTypes = {
    parts: PropTypes.array.isRequired,
}

Total.propTypes = {
    parts: PropTypes.array.isRequired,
}

export default Course;