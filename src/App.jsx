import MiComponente from "./components/MiComponente";
import MiContador from "./components/MiContador";
import DetallesProducto from "./components/misproductos/DetallesProducto";
import MisProductos from "./components/misproductos/MisProductos";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import MiContadorConReducer from "./components/MiContadorConReducer";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import MiToDoList from "./components/MiTodoList";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<MiComponente />} />
            <Route path="/miproducto/:id" element={<DetallesProducto />} />
            <Route path="/misproductos" element={<MisProductos />} />
            <Route path="/micontador" element={<MiContador />} />
            <Route
              path="/micontadorreducer"
              element={<MiContadorConReducer />}
            />
            <Route path="/mitodolist" element={<MiToDoList />} />
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
