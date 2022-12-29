import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Views from "./views";
import Header from "./common/header/header";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Footer from "./common/footer/footer";

function App() {
  const [header, setHeader] = useState(false);
  const [courseById, setcourseById] = useState([]);
  const [footer, setFooter] = useState(false);
  
  const getCourseById = async (id) => {
    let token = localStorage.getItem("jwtToken");
    const data = await fetch(`http://localhost:8080/course/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: "bearer " + token,
      },
    });
    const result = await data.json();
    setcourseById([result[0]]);
  };
  const removeToken = () => {
    localStorage.removeItem("jwtToken")
    setHeader(false);
    setFooter(false);
  };
  const addToken=()=>{
    setHeader(true)
    setFooter(true)
  }
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    let token=localStorage.getItem("jwtToken");
    if(token){
      setHeader(true)
      setFooter(true)
    }
  }, []);
  const listCourses = async () => {
    let token = localStorage.getItem("jwtToken");
    const data = await fetch(`http://localhost:8080/courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: "bearer " + token,
      },
    });
    const jsonData = await data.json();
    setCourses(jsonData);
    setFooter(!footer);
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Header onAdd={removeToken} header={header} />
        <Views
          onAdd={() => setHeader(true)}
          courses={courses}
          onChangeCourses={listCourses}
          getCourseById={getCourseById}
          courseById={courseById}
          footer={footer}
          setFooter={setFooter}
          setCourses={setCourses}
        />
        {footer && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
