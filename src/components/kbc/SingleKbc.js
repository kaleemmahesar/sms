import React from 'react'

const SingleKbc = ({item, updateScore}) => {
    
    return (
        <div className={`question-box ${item.status ? 'answered' : 'waiting'}`}>
            <h2>{item.question}</h2>
            <button className="" onClick={() => updateScore('A', item.id, item.status)}>{item.choices.A}</button>
            <button className="" onClick={() => updateScore('B', item.id, item.status)}>{item.choices.B}</button>
            <button className="" onClick={() => updateScore('C', item.id, item.status)}>{item.choices.C}</button>
            <button className="" onClick={() => updateScore('D', item.id, item.status)}>{item.choices.D}</button>
        </div>
    )
}

export default SingleKbc
