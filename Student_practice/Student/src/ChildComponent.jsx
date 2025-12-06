
import React from 'react'

const ChildComponent = (ounter, onChangeCounter) => {
  return (
    <div>
        <button onClick ={()=>{onChangeCounter(counter => counter+1)}}>Increment</button>
    </div>
  )
}

export default ChildComponent