import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";

export function HomePage({ cart , LoadCart}) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const fetchHomeData = async () => {
      let url = "/api/products";
      if (search) {
        url = `/api/products?search=${search}`;
      }
      const response = await axios.get(url);
      setProducts(response.data);
    };
    fetchHomeData();    
  }, [search]);

  return (
    <>
      <Header cart={cart} />
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <title>HomePage</title>

      <div className="home-page">
        <ProductsGrid products={products} LoadCart={LoadCart} />
      </div>
    </>
  );
}
