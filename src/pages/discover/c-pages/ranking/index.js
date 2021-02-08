import React, { memo, useEffect, useState, useRef } from 'react';

export default memo(function ZRanking() {

    const [count, setCount] = useState(0)
    
    const refCount = useRef()
    
    
    return (
        <div>
            <h2>count: {count}</h2>
            <h2>refCount: {refCount.current}</h2>
            <button onClick={() => { setCount(count + 1) }}>count + 1</button>
        </div>
    )
})