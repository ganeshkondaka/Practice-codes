import './App.css'
import Another from './components/Another';
import Changer from './components/Changer';
import { Store } from './store'

function App() {
  const { counter, increment, decrement } = Store();
  return (
    <div style={{ display: 'flex',alignItems :'center',justifyContent:'center',flexDirection:'column' }}>
      <Changer></Changer>
      <Another></Another>
      <div>
        <button onClick={decrement}>-</button>
        <p style={{ margin: 6 }}>{counter}</p>
        <button onClick={increment}>+</button>
      </div>
    </div>
  )
}

export default App
