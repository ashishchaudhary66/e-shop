import React, { useEffect, useState } from 'react'
import './Container.css'
import Card from './Card'
import axios from 'axios';

function Container() {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div className='Container'>
        {
            products.map((product, index)=>{
                return <Card key={index} product={product} />
            })
        }
    </div>
  )
}

export default Container