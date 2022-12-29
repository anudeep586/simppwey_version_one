import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./course.css";
import Video from "./video";

const Course = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [courseById, setcourseById] = useState([]);
 const [wishlistIcon,setwishlistIcon]=useState(false)
 const addToWishlist=async(id)=>{
  let token = localStorage.getItem("jwtToken");
      const data = await fetch(`http://localhost:8080/wishlists/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: 'bearer '+token,
        },
      });
      const result = await data.json();
      setwishlistIcon(result.check);
 }
 const deleteFromWishList=async(id)=>{
  let token = localStorage.getItem("jwtToken");
      const data = await fetch(`http://localhost:8080/wishlists/${params.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: 'bearer '+token,
        },
      });
      const result = await data.json();
      setwishlistIcon(result.check);
 }
 
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
  };
  const navigateToCheckout = async(id) => {
    addToCart(id);
    navigate("/checkout");
  };
  useEffect(() => {
    const getCourse = async () => {
      let token = localStorage.getItem("jwtToken");
      const data = await fetch(`http://localhost:8080/course/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const result = await data.json();
      setcourseById(result);
    };
    getCourse();
    const getWishlist=async()=>{
      let token = localStorage.getItem("jwtToken");
      const data = await fetch(`http://localhost:8080/wishlists/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: 'bearer '+token,
        },
      });
      const result = await data.json();
      setwishlistIcon(result.check);
    }
    getWishlist()
  }, []);
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="container mt-5 mb-5">
        <div className="row d-flex justify-content-center custom">
          <div className="col-md-10 change">
            <div className="card">
              <div className="row">
                <div className="col-md-6">
                  <div className="images p-3">
                    <div className="text-center p-4">
                      {" "}
                      <img
                        id="main-image customImage"
                        src={courseById[0]?.img}
                        width="370"
                      />{" "}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="product p-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        {" "}
                        <button
                          className="ml-1 btn btn-danger text-uppercase mr-2 px-4"
                          onClick={() => navigate(-1)}
                        >
                          Back
                        </button>{" "}
                      </div>{" "}
                      <button
                        className="shopping-cart"
                        onClick={() => addToCart(params.id)}
                      >
                        <i className="fa fa-shopping-cart text-muted"></i>
                      </button>
                    </div>
                    <div className="mt-4 mb-3">
                      {" "}
                      <span className="text-uppercase text-muted brand">
                        Course
                      </span>
                      <h5 className="text-uppercase">{courseById[0]?.title}</h5>
                      <div className="price d-flex flex-row align-items-center">
                        {" "}
                        <span className="act-price">
                          ${courseById[0]?.price} Only
                        </span>
                        <div className="ml-2">
                          {" "}
                          <small className="dis-price"> $22500</small>{" "}
                          <span>40% OFF</span>{" "}
                        </div>
                      </div>
                    </div>
                    <p className="about">{courseById[0]?.description}</p>

                    <div className="cart mt-4 align-items-center">
                      {" "}
                      <button
                        className="btn btn-danger text-uppercase mr-2 px-4"
                        onClick={() => navigateToCheckout(courseById[0]?.id)}
                      >
                        Buy
                      </button>{" "}
                     {!wishlistIcon && <i className="fa fa-heart" onClick={()=>addToWishlist(courseById[0]?.id)}></i>}{" "}
                     {wishlistIcon && <i className="fa fa-heart redcolor" onClick={()=>deleteFromWishList(courseById[0]?.id)}></i>}{" "}
                      <i className="fa fa-share-alt"></i>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Video title={"Lecture 1:- Introduction to react"} description={"why react everywhere"} video_url={"https://vjs.zencdn.net/v/oceans.webm"}/>
        <Video title={"Lecture 2:-creating beautiful ui for screens"} description={"desining home screen part1 and part2"} video_url="https://dl8.webmfiles.org/big-buck-bunny_trailer.webm"/>
        <Video title={"Lecture 3:-Adding react navigation"} description={"installation and add navigation customizing Header"}video_url={"https://vjs.zencdn.net/v/oceans.webm"}/>
        <Video title={"Lecture 4:-Accessing camera image and uploading images"} description={"upload images to cloudinary"} video_url={"https://dl8.webmfiles.org/elephants-dream.webm"}/>
        <Video title={"Lecture 5:- bonus"} description={"Get my others for free"} video_url={"https://dl8.webmfiles.org/elephants-dream.webm"}/>
      </div>
    </>
  );
};

export default Course;
