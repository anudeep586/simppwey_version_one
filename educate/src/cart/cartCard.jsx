import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import './cartCard.css'


const CartCard = ({id,aos,aos_offset,title,description,img,deleteFromCart,cartNavigateToCourse}) => {
  
  return (

<div id={id} data-aos={aos} data-aos-offset={aos_offset} className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
     <div className="card p-0 overflow-hidden h-100 shadow">
       <img src={img} className="card-img-top" alt="..." onClick={()=>cartNavigateToCourse(id)}/>
       <div className="card-body">
         <h5 className="card-title">{title}</h5>
         <p className="card-text">{description}</p>
 <Link to={`/cart`}><button type="button" className="btn btn-secondary btn-lg" onClick={()=>deleteFromCart(id)}>Delete</button></Link> 
        
       </div>
     </div>
    </div>
  )
}

export default CartCard

