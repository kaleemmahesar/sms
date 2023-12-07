import { React, memo, forwardRef } from 'react'

const ChildB = (props, ref) => {
    console.log('child b renders')
    return (
        <div>
            <p>Child B</p>
            <input type="text" ref={ref} />
        </div>
    )
}

export default forwardRef(ChildB)