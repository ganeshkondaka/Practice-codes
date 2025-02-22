import React from 'react'
import { Store } from '../store'

export default function Changer() {
    const { counter } = Store()
    return (
        <div style={{fontSize:'30px'}}>
           the counter value is : {counter}
        </div>
    )
}
