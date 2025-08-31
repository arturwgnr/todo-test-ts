import './App.css'
import { useState, useEffect } from 'react'

function App() {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('savedTasks');

    return saved ? JSON.parse(saved) : []
  })

  type TaskStatus = 'pending' | 'completed';

  interface Task {
    id: number,
    content: string,
    timetag: string,
    status: TaskStatus,
  }


  function handleAddTask() {

    if(!task) return;


   
    const newTask: Task =  {
      id: Date.now(),
      content: task,
      timetag: new Date().toString(),
      status: 'pending'
    }

    setTasks([...tasks, newTask]);

    console.log(newTask);
    console.log(tasks);
    setTask('');

  }

  function handleDelete(id: number) {
    const updatedTasks = tasks.filter((t) => t.id !== id);

    setTasks(updatedTasks);
  } 

  useEffect(() => {
    const saved = localStorage.getItem('savedTasks');

    if(saved) {
      setTasks(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('savedTasks', JSON.stringify(tasks))
  }, [tasks])

function handleStatus(id: number) {
  const updated = tasks.map((t) =>
    t.id === id 
      ? { ...t, status: t.status === "pending" ? "completed" : "pending" }
      : t
  );

  setTasks(updated);
}
 
  return (
    <div className='main-div'>

      <div className="title-div">
      <h1>Welcome to Task Reminder litle!</h1>
      <p>Believe in yourself</p>
      </div>

      <div className="crud-area">
        <input value={task} onChange={(e) => setTask(e.target.value)} type="text" placeholder='Insert your task' /> <button onClick={handleAddTask}>Add Task</button>
      </div>
    
    <div className="list-div">
      <ul>
      {tasks.map((item) => (
        <li 
  onClick={() => handleStatus(item.id)} 
  key={item.id} 
  className={item.status}
>
  {`${item.content} | ${item.status}`}
  <button onClick={() => handleDelete(item.id)}>x</button>
</li>
      ))}
      </ul>
    </div>
      </div>
  )
}

export default App
