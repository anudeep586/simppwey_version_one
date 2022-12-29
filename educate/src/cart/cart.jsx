import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import CartCard from "./cartCard";
import WishCard from "./wishCard";
import { useNavigate } from "react-router-dom";
import "./cartCard.css";

const Cart = () => {
  const [cartCourses, setcartCourses] = useState([]);
  const [wishlist, setwishlist] = useState([]);
  const [cartChanges,setcartChanges]=useState(false)
  const navigate = useNavigate();
  const cartNavigateToCourse = (id) => {
    navigate(`/course/${id}`);
  };
  const addToCart = async (id) => {
    const token = localStorage.getItem("jwtToken");
    const data = await fetch(`http://localhost:8080/coursestage/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: "bearer " + token,
      },
      body: JSON.stringify({ stage: "CART" }),
    });
    setcartChanges(!cartChanges)
  };
  const deleteFromCart = async (id) => {
    const getToken = localStorage.getItem("jwtToken");
    const deleteFCart = await fetch(`http://localhost:8080/coursestage/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: "bearer " + getToken,
      },
    });
    const result = await deleteFCart.json();
    setcartCourses(result);
  };
  useEffect(() => {
    const check = async () => {
      const getToken = localStorage.getItem("jwtToken");
      const data = await fetch(`http://localhost:8080/cartcourses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: "bearer " + getToken,
        },
      });
      const result = await data.json();
      setcartCourses(result);
      Aos.init();
    };
    const check1 = async () => {
      const getToken = localStorage.getItem("jwtToken");
      const data = await fetch(`http://localhost:8080/wishlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: "bearer " + getToken,
        },
      });
      const result = await data.json();
      setwishlist(result.data);
      console.log(wishlist, "wishlist");
      Aos.init();
    };
    check();
    check1();
  }, [cartChanges]);
  return (
    <>
      <section className="py-4 py-lg-5 container">
        <div className="row cartCustom">
          {cartCourses.length > 0 &&
            cartCourses.map((course) => (
              <CartCard
                aos={"fade-zoom-in"}
                aos_offset={200}
                description={course.description}
                img={course.img}
                title={course.title}
                id={course.id}
                deleteFromCart={deleteFromCart}
                cartNavigateToCourse={cartNavigateToCourse}
              />
            ))}
        </div>
        <link
          href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
          rel="stylesheet"
          id="bootstrap-css"
        />
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

        <div className="cart-wrap">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="main-heading mb-10">My wishlist</div>
                <div className="table-wishlist">
                  <table
                    cellPadding="0"
                    cellspacing="0"
                    border="0"
                    width="100%"
                  >
                    <thead>
                      <tr>
                        <th width="45%">Course Name</th>
                        <th width="15%"> Price</th>
                        <th width="15%">Stock Status</th>
                        <th width="15%"></th>
                        <th width="10%"></th>
                      </tr>
                    </thead>
                    {wishlist.length > 0 &&
                      wishlist.map((course) => (
                        <WishCard
                          aos={"fade-zoom-in"}
                          aos_offset={200}
                          description={course.description}
                          img={course.img}
                          title={course.title}
                          id={course.courseId}
                          price={course.price}
                          deleteFromCart={deleteFromCart}
                          cartNavigateToCourse={cartNavigateToCourse}
                          addToCart={addToCart}
                        />
                      ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
