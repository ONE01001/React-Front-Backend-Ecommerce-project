import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <Header cart={cart} />
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <title>HomePage</title>

      <div className="home-page">
        <ProductsGrid products={products}/>
      </div>
    </>
  );
}
