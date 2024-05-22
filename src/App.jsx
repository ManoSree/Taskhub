import { useState, useEffect } from 'react'
import Createtask from './component/Createtask';
import { ToastContainer } from 'react-toastify';

import './App.css'
import ListTask from './component/ListTask';

function App() {
  const[task,setTask] = useState([]);

  console.log("tasks",task);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTask(JSON.parse(savedTasks));
    }
  }, []);
  
  return (
    <>
      <ToastContainer />
    <div className='bg-slate-100 w-screen h-screen flex flex-col items-center pt-3 gap-16'>
      <Createtask task={task} setTask={setTask}/>
      <ListTask task={task} setTask={setTask}/>
    </div>
    </>
  )
}

export default App
