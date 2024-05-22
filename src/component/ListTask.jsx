import { useEffect, useState } from "react";

const ListTask = ({ task, setTask }) => {
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const fTodo = task.filter((task) => task.status === "todo");
    const fInprogress = task.filter((task) => task.status === "inProgress");
    const fCompleted = task.filter((task) => task.status === "completed");

    setTodo(fTodo);
    setInProgress(fInprogress);
    setCompleted(fCompleted);
  }, [task]);

  const statuses = ["todo", "inprogress", "completed"];

  return (
    <>
      <div className="flex gap-16">
        {statuses.map((status, index) => (
          <Section
            key={index}
            status={status}
            task={task}
            setTask={setTask}
            todo={todo}
            inProgress={inProgress}
            completed={completed}
          />
        ))}
      </div>
    </>
  );
};

export default ListTask;

const Section = ({ status, task, setTask, todo, inProgress, completed }) => {

    let text= "Todo";
    let bg = "bg-slate-500";
    let taskToMap = todo

    if(status==="inprogress"){
        text = " In Progress"
        bg = "bg-purple-400"
        taskToMap= inProgress
    }

    if(status==="completed"){
        text = " Completed"
        bg = "bg-green-400"
        taskToMap= completed
    }

  return (
    <div className="w-64">
      <Header text={text} bg={bg} count={taskToMap.length}/>
      {taskToMap.length > 0 && taskToMap.map(task=> <Task key={task.id} task={task} tasks={tasks} setTask={setTask}/>)} 
    </div>
  );
};

const Header =({text, bg, count})=>{
    return(
        <>
         <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
            {text} 
            <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">{count}</div>
         </div>
        </>
    );
}


const Task =(task , tasks , setTask)=>{
    return(
        <>
        <div>
            <p>{task.name}</p>
        </div>
        </>
    );
}
