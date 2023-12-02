import { useReducer } from "react";

const contadorReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const MiContadorConReducer = () => {
  const initialState = { count: 0 };

  const [state, dispatch] = useReducer(contadorReducer, initialState);

  return (
    <div>
      <h2>Mi Contador con useReducer</h2>
      <p>Contador: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>
        Incrementar
      </button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>
        Decrementar
      </button>
    </div>
  );
};

export default MiContadorConReducer;
