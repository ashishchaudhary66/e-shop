import React, { useEffect } from "react";
import "./Home.css";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/productActions";
import Loader from "../components/Loader";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="Container">
      {products.length > 0 ? (
        products.map((product, index) => (
          <Card key={index} product={product} />
        ))
      ) : (
        <div className="center-loader">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Home;
