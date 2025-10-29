import React, { useEffect } from "react";
import "./Container.css";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/productActions";

function Container() {
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
        <p>Loading products...</p>
      )}
    </div>
  );
}

export default Container;
