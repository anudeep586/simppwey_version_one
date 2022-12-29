import React from "react";
import { Link } from "react-router-dom";

const WishCard = ({
  id,
  aos,
  aos_offset,
  title,
  description,
  addToCart,
  img,
  price,
  cartNavigateToCourse,
}) => {
  return (
    <>
      <tbody>
        <tr>
          <td width="45%">
            <div className="display-flex align-center">
              <div className="img-product">
                <img
                  src={img}
                  alt=""
                  className="mCS_img_loaded"
                  onClick={()=>cartNavigateToCourse(id)}
                />
              </div>
              <div className="name-product">{title}</div>
            </div>
          </td>
          <td width="15%" className="price">
            {price} $
          </td>
          <td width="15%">
            <span className="in-stock-box">In Stock</span>
          </td>
          <td width="15%">
            <button className="round-black-btn small-btn" onClick={()=>addToCart(id)}>Add to Cart</button>
          </td>
          <td width="10%" className="text-center">
          </td>
        </tr>
        
      </tbody>
    </>
  );
};

export default WishCard;
