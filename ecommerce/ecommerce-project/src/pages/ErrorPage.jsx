import { Header } from "../components/Header";
import "./ErrorPage.css";

export function ErrorPage({ cart }) {
  return (
    <>
      <Header cart={cart} />
      <div className="not-found-message">
        <h1> Page not found </h1>
      </div>
    </>
  );
}
