import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        axios.get('http://backend:5000/tasks')
            .then(res => setTasks(res.data))
            .catch(err => console.error(err));
    }, []);

    const addTask = () => {
        axios.post('http://backend:5000/tasks', { task })
            .then(res => setTasks([...tasks, res.data]))
            .catch(err => console.error(err));
        setTask('');
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input value={task} onChange={e => setTask(e.target.value)} />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((t, index) => <li key={index}>{t.task}</li>)}
            </ul>
        </div>
    );
}

export default App;
