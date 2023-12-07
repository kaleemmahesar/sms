import React, { useEffect } from 'react'

const ChildA = ({someFunction}) => {
    console.log('child a renders')
    return (    
        <div>
            <p>Child A</p>
            <button onClick={() => someFunction('red')}>forwardRef</button>
        </div>
    )
}

export default ChildA