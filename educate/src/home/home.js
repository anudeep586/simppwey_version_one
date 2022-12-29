import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Card from "./card";
import "./home.css";
import { useNavigate, Link } from "react-router-dom";
import CategoriesCard from './categoriesCard'

const Home = ({ courses, courseById, getCourseById, setCourses }) => {
  const [search, setSearch] = useState("all");
  let videos="https://vjs.zencdn.net/v/oceans.mp4"
  let logos="data:image/png;base64,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"
  let navigate = useNavigate();
  const [firstRender,setFirstRender]=useState(false)
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = "";
    if (search.length === 0) {
      console.log(search);
      data = await fetch(`http://localhost:8080/search/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
    } else {
      data = await fetch(`http://localhost:8080/search/${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    const jsonData = await data.json();
    setCourses(jsonData);
  };
  useEffect(() => {
    const cool = async () => {
      const data = await fetch(`http://localhost:8080/search/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await data.json();
      setCourses(jsonData);
    };
    if(!firstRender){
    cool();
    setFirstRender(!firstRender)
    }
    Aos.init();
  });
  return (
    <>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossOrigin="anonymous"
      ></script>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      ></link>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner custom1">
          <div className="carousel-item active">
            <img
              src="https://img.freepik.com/free-vector/digital-online-education-concept-blank-space-laptop_255625-422.jpg?w=2000"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://economictimes.indiatimes.com/thumb/msid-68850155,width-1200,height-900,resizemode-4,imgsize-148529/elearning-getty.jpg?from=mdr"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://t4.ftcdn.net/jpg/04/45/70/71/360_F_445707107_elptpcI7pUDPa9kMdnX9e3506QdHfo7r.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="box">
        <form name="search" onSubmit={onSubmit}>
          <input
            type="text"
            className="input"
            name="txt"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </form>
        <i className="fas fa-search icon"></i>
      </div>
{/* { doing categories  } */}

<div className="wrapperHome">
      <CategoriesCard logo={"https://d1jnx9ba8s6j9r.cloudfront.net/imgver.1551437392/img/co_img_1520_1631891680.png"} video={videos} />
      <CategoriesCard logo={"https://image.shutterstock.com/image-illustration/machine-code-languages-on-blue-260nw-1680857539.jpg"} video={videos} />
      <CategoriesCard logo={"https://thumbs.dreamstime.com/b/python-programming-language-programing-workflow-abstract-algorithm-concept-virtual-screen-200850656.jpg"} video={videos} />
      <CategoriesCard logo={logos} video={videos} />
      <CategoriesCard logo={logos} video={videos} />
      <CategoriesCard logo={logos} video={videos} />
    </div>
      <section className="py-4 py-lg-5 container">
        <div className="row">
          {courses.map((course, index) => (
            <Card
              index={index}
              aos={"fade-zoom-in"}
              aos_offset={200}
              description={course.description}
              img={course.img}
              title={course.title}
              id={course.id}
              courseById={courseById}
              getCourseById={getCourseById}
            />
          ))}{" "}
        </div>
      </section>

      {/* <div class="wrapper box1 container">
		<div class="single-box"><img alt="" src="https://t4.ftcdn.net/jpg/04/45/70/71/360_F_445707107_elptpcI7pUDPa9kMdnX9e3506QdHfo7r.jpg"/></div>
		<div class="single-box"><img alt="" src="https://static.businessworld.in/article/article_extra_large_image/1619111145_soDM9U_e_learning.jpg"/></div>
		<div class="single-box"><img alt="" src="https://t4.ftcdn.net/jpg/04/45/70/71/360_F_445707107_elptpcI7pUDPa9kMdnX9e3506QdHfo7r.jpg"/></div>
		<div class="single-box"><img alt="" src="https://static.businessworld.in/article/article_extra_large_image/1619111145_soDM9U_e_learning.jpg"/></div>
	</div> */}
    </>
  );
};

export default Home;
