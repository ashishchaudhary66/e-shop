import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../redux/actions/productActions";
import Loader from "./Loader";

function ProductDetails() {
  const { id } = useParams();
  const { productDetails, isLoading, error } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);
  if (isLoading) return <p><Loader /></p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>{productDetails.title}</h2>
      <img src={productDetails.image} alt={productDetails.title} />
      <p>{productDetails.description}</p>
      <p>Category: {productDetails.category}</p>
      <p>Price: ${productDetails.price}</p>
    </div>
  );
}

export default ProductDetails;
