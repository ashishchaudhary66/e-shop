import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../redux/actions/productActions';

function ProductDetails() {
    const {id} = useParams();
    const product = useSelector((state) => state.product.selectedProduct);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductDetails(id));
    }, [dispatch, id]);
  return (
    <div>
        {
            product ? (
                <div>
                    <h2>{product.title}</h2>
                    <img src={product.image} alt={product.title} />
                    <p>{product.description}</p>
                    <p>Category: {product.category}</p>
                    <p>Price: ${product.price}</p>
                </div>
            ) : (
                <p>Loading product details...</p>
            )
        }
    </div>
  )
}

export default ProductDetails