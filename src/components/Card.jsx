import React from 'react'
import './Card.css'

function Card({product}) {
    console.log(product);
  return (
    <div className="Card">
      <img src={product.image} alt={product.title} className="card-image" />
      <h3 className="card-title">{product.title}</h3>
      <p className="card-category">{product.category}</p>
      <p className="card-price">${product.price}</p>
      <div className='card-add-cart'>
        Add To Cart
      </div>
    </div>
  )
}

export default Card