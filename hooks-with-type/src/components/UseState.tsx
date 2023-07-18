import { useState } from "react"


const UseState = ():JSX.Element=>{
    const [count, setCount] = useState<number>(0)


    const increment = ()=>{
        setCount(prevState => prevState + 1)
    }

    const decrement = ()=>{
        setCount(prevState => prevState - 1)
    }

    const reset = ()=>{
        setCount(0)
    }

    return(
        <div>
            <h2 style={{textAlign:'center'}}>UseState</h2>
            <h3 style={{textAlign:'center'}}>{count}</h3>
            <div style={{display:'flex', gap:10}}>
                <button onClick={decrement}>-</button>
                <button onClick={reset}>Reset</button>
                <button onClick={increment}>+</button>
            </div>
        </div>
    )
}

export default UseState