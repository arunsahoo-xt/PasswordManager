import React, { Fragment } from 'react'

const Counter = () => {
    const [count, setCount] = React.useState(0);
    function addCount() {
        setCount(count + 1);
    }
    function minusCount() {
        setCount(count - 1);
    }
    return (
        <Fragment>
            <button onClick={addCount}>
                +
            </button>
            <div>{count}</div>
            <button onClick={minusCount}>
                -
            </button>
        </Fragment>
    )
}

export default Counter