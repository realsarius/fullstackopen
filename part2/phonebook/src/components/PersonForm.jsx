import PropTypes from "prop-types";

const PersonForm = ({formSubmitHandler, newName, newNumber, onChangeHandler}) => {
    return (
        <form onSubmit={formSubmitHandler}>
            <div>
                name: <input id={"name"} type={"text"} value={newName} onChange={onChangeHandler}/>
                <br/>
                number: <input id={"phone"} type={"text"} value={newNumber} onChange={onChangeHandler}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

PersonForm.propTypes = {
    formSubmitHandler: PropTypes.func,
    newName: PropTypes.string,
    newNumber: PropTypes.string,
    onChangeHandler: PropTypes.func,
}

export default PersonForm;