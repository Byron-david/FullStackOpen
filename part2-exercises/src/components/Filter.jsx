const Filter = ({ handleChange }) => {
    return (
        <div>
            filter: <input onChange={handleChange}/>
        </div>
    )
}

export default Filter