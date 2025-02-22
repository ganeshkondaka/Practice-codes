import React from 'react'
import { Store } from '../store'

export default function Another() {
    const { counter } = Store()
    return (
        <div style={{fontSize:'50px',color:'yellow',padding:'10px',fontWeight:'bolder'}}>
            {counter}
        </div>
    )

}
