import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Createtask = () => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo", // can also be "inprogress" or "completed"
  });

  console.log(task);
  
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // if(task.name.length < 3) return toast.error("A task must have more than 3 characters")

    const newTask = { ...task, id: uuidv4() };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    // toast.success("task created");
    setTask({ id: "", name: "", status: "todo" }); // Reset the task input fields
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        />
        <button className="bg-cyan-500 rounded-md h-12 text-white px-4" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default Createtask;
