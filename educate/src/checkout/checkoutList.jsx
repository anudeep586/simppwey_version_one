import React, { useEffect } from 'react'

const CheckoutList = ({title,price}) => {
  return (
    <>
    <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 className="my-0">{title}</h6>
            <small className="text-muted"></small>
          </div>
          <span className="text-muted">{price} $</span>
        </li>
    </>
  )
}

export default CheckoutList