import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetallesProducto = () => {
  const [producto, setProducto] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const product = await response.json();
        setProducto(product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!producto) {
    return <p>Cargando detalles del producto...</p>;
  }

  return (
    <div>
      <h2>Detalles del Producto</h2>
      <h3>{producto.title}</h3>
      <p>{producto.description}</p>
      <p>Categoría: {producto.category}</p>
      <p>Rating: {producto.rating}</p>
      <p>Precio: {producto.price}</p>
    </div>
  );
};

export default DetallesProducto;
