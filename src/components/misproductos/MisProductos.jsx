import { useState, useEffect } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const MisProductos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroRating, setFiltroRating] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const { products } = await response.json();
        setProductos(products);
        const uniqueCategorias = [
          ...new Set(products.map((producto) => producto.category)),
        ];
        setCategorias(uniqueCategorias);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filtrarProductos = () => {
    return productos.filter(
      (producto) =>
        (!filtroCategoria || producto.category === filtroCategoria) &&
        (!filtroRating ||
          Math.floor(producto.rating) === parseInt(filtroRating, 10))
    );
  };

  return (
    <div>
      <h2>Mis Productos</h2>
      <div>
        <label>
          Filtrar por Categoría:
          <select onChange={(e) => setFiltroCategoria(e.target.value)}>
            <option value="">Todas</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filtrar por Rating:
          <select onChange={(e) => setFiltroRating(e.target.value)}>
            <option value="">Todos</option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating} estrellas
              </option>
            ))}
          </select>
        </label>
      </div>

      {filtrarProductos().map((producto) => (
        <div key={producto.id} className="card">
          <h3>{producto.title}</h3>
          <p>{producto.description}</p>
          <p>Categoría: {producto.category}</p>
          <p>Rating: {producto.rating}</p>
          <p>Precio: {producto.price}</p>
          <Link to={`/miproducto/${producto.id}`}>Ver Detalles</Link>
        </div>
      ))}
    </div>
  );
};

export default MisProductos;
