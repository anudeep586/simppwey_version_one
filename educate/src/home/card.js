import React, { useEffect,useState } from 'react'
import {Link,useNavigate}  from 'react-router-dom'

const Card = ({id,aos,aos_offset,title,description,img,getCourseById,CourseById,index}) => {
  const [validUser,setvalidUser]=useState(false)
  let navigate=useNavigate();
  useEffect(()=>{
    let token=localStorage.getItem("jwtToken")
    if(!token){
      setvalidUser(false)
    }
    else{
      setvalidUser(true)
    }
  },[])
  const check=(id)=>{
    let token=localStorage.getItem("jwtToken")
    if(token){
    getCourseById(id)
    }
    else{
      navigate("login")
    }
  }
  return (
    //data-aos={aos} data-aos-offset={aos_offset} use this in card for hover effect
    <>
     <div id={id}  className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
          <div className="card p-0 overflow-hidden h-100 shadow">
            <img src={img} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
          { validUser && <Link to={`course/${id}`}>
              <button type="button" className="btn btn-primary btn-lg"  onClick={()=>{check(id)}}>Buy</button>
              </Link>}
              { !validUser && <Link to={`/signup`}>
              <button type="button" className="btn btn-primary btn-lg"  onClick={()=>{check(id)}}>Buy</button>
              </Link>}
            </div>
          </div>
        </div>
        </>
  )
}

export default Card