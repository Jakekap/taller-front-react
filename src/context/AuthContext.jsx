import { createContext, useReducer, useContext, useEffect } from "react";
import PropTypes from "prop-types";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload, isAuthenticated: true };
    case LOGOUT:
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedState = sessionStorage.getItem("authState");
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      // Verificar si el usuario está autenticado antes de cargar el estado
      if (parsedState.isAuthenticated) {
        dispatch({ type: LOGIN, payload: parsedState.user });
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("authState", JSON.stringify(state));
  }, [state]);

  const login = (user) => {
    dispatch({ type: LOGIN, payload: user });
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
