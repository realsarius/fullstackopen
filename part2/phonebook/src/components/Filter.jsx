import PropTypes from "prop-types";

const Filter = ({filterName, onChangeHandler}) => {
    return (
        <div>
            filter shown with <input id={"filterName"} type="text" value={filterName} onChange={onChangeHandler}/>
        </div>
    )
}

Filter.propTypes = {
    filterName: PropTypes.string,
    onChangeHandler: PropTypes.func
}

export default Filter;