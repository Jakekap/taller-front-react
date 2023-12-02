import { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const TOGGLE_TASK = "TOGGLE_TASK";
export const FILTER_TASKS = "FILTER_TASKS";

const taskReducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case REMOVE_TASK:
      return state.filter((task) => task.id !== action.payload);
    case TOGGLE_TASK:
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    case FILTER_TASKS:
      return state.filter((task) =>
        action.payload === "all"
          ? true
          : action.payload === "completed"
          ? task.completed
          : !task.completed
      );
    default:
      return state;
  }
};

const initialState = [];

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask debe ser utilizado dentro de un TaskProvider");
  }
  return context;
};

export { TaskProvider, useTask };
TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
