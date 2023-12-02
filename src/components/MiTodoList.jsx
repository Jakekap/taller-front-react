import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  useTask,
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK,
} from "../context/TaskContext";

const MiToDoList = () => {
  const { state: authState } = useAuth();
  const { state: taskState, dispatch } = useTask();
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (newTask.trim() !== "") {
      dispatch({ type: ADD_TASK, payload: newTask });
      setNewTask("");
    }
  };

  const removeTask = (taskId) => {
    dispatch({ type: REMOVE_TASK, payload: taskId });
  };

  const toggleTask = (taskId) => {
    dispatch({ type: TOGGLE_TASK, payload: taskId });
  };

  const filterTasks = (status) => {
    setFilter(status);
  };

  const filteredTasks = taskState.filter((task) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return task.completed;
    } else {
      return !task.completed;
    }
  });

  if (!authState.isAuthenticated) {
    return <p>No estás autorizado. Por favor, inicia sesión.</p>;
  }

  return (
    <div>
      <h2>Mi To-Do List</h2>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button onClick={addTask}>Agregar tarea</button>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => removeTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={() => filterTasks("all")}>Mostrar todas</button>
        <button onClick={() => filterTasks("pending")}>
          Mostrar pendientes
        </button>
        <button onClick={() => filterTasks("completed")}>
          Mostrar completadas
        </button>
      </div>
    </div>
  );
};

export default MiToDoList;
