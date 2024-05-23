import { useEffect, useState} from "react";
import { useDrag,useDrop } from "react-dnd";

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

  const statuses = ["todo", "inProgress", "completed"];

  const Section = ({ status, tasks, setTask, todo, inProgress, completed }) => {

    const [{ isOver }, drop] = useDrop(() => ({
      accept: "task",
      drop:(item) => addItemToSection(item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

    let text = "Todo";
    let bg = "bg-red-400";
    let taskToMap = todo;

    if (status === "inProgress") {
      text = " In Progress";
      bg = "bg-purple-400";
      taskToMap = inProgress;
    }

    if (status === "completed") {
      text = " Completed";
      bg = "bg-green-400";
      taskToMap = completed;
    }

    const addItemToSection = (id) =>{
      setTask(prev=>{
        const nTask = prev.map(t =>{
          if(t.id === id){
            return {...t, status:status}
          }
          return t;
        })
        
        localStorage.setItem("task" , JSON.stringify(nTask))

        return nTask
      })
      console.log("dropped" , id , status);
    }

    return (
      <div ref={drop} className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-200" : " "}`}>
        <Header text={text} bg={bg} count={taskToMap.length} />
        {taskToMap.length > 0 &&
          taskToMap.map((task) => (
            <Task key={task.id} task={task} tasks={tasks} setTask={setTask} />
          ))}
      </div>
    );
  };

  const Header = ({ text, bg, count }) => {
    return (
      <>
        <div
          className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}
        >
          {text}
          <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
            {count}
          </div>
        </div>
      </>
    );
  };

  const Task = ({ task, tasks, setTask }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "task",
      item:{id:task.id},
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    console.log(isDragging);

    const handleRemove = (id) => {
      const updatedTasks = task.filter((t) => t.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTask(updatedTasks);
    };
    return (
      <>
        <div
          ref={drag}
          className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${
            isDragging ? "opacity-20" : "opacity-100"
          }`}
        >
          <p>{task.name}</p>
          <button
            className="absolute bottom-1 right-1 text-slate-400"
            onClick={() => handleRemove(task.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
      </>
    );
  };

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
