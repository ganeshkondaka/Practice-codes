import {create} from 'zustand'
export const Store=create((set)=>(
    {
        counter:0,
        increment:()=>set((state)=>(
            {
                counter:state.counter+1
            }
        )),
        decrement:()=>set((state)=>(
            {
                counter:state.counter-1
            }
        ))
    }
)) 