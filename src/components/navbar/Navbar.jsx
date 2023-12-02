import { Link } from "react-router-dom";
import "./styles.css";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { state: authState, login, logout } = useAuth();

  const handleAuthToggle = () => {
    if (authState.isAuthenticated) {
      // Si está autenticado, cierra la sesión
      logout();
    } else {
      // Si no está autenticado, inicia sesión (puedes agregar tu lógica de inicio de sesión aquí)
      const user = {
        /* información del usuario */
      };
      login(user);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/">Inicio</Link>
        <Link to="/micontador">Contador</Link>
        <Link to="/misproductos">Productos</Link>
        <Link to="/micontadorreducer">Contador con useReducer</Link>
        <Link to="/mitodolist">ToDo List</Link>
        <button onClick={handleAuthToggle}>
          {authState.isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
