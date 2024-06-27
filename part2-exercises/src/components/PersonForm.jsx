const PersonForm = ({ handleAdd, nameValue, numberValue, handleName, handleNumber }) => {
    return (
        <form onSubmit={handleAdd}>
            <div>
            name: <input 
                    value={nameValue}
                    onChange={handleName}
                />
            </div>
            <div>
            number: <input 
                        value={numberValue}
                        onChange={handleNumber}
                />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
      </form>
    )
}

export default PersonForm