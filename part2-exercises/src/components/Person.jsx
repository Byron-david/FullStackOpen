const Person = ({ person, handleDelete }) => {
    return (
        <>
            <div>
                <li className='note'>{person.name} {person.number} <button onClick={handleDelete}>Delete</button></li>
            </div>
        </>

    )
}

export default Person