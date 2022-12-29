import React, { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

const Verify = () => {
  let navigate=useNavigate();
    const params=useParams();
    useEffect(()=>{
        const checkUser=async()=>{
        const data=await fetch(`http://localhost:8080/verifyuser/${params.id}`,{
            method:"GET",
            headers:{
              "Content-Type": "application/json",
            },
          })
          const jsonData=await data.json();
      localStorage.setItem("jwtToken",jsonData.token);
      setTimeout(()=>{
        navigate("/home")
        window.location.reload()
      },10000)
        }
        checkUser();
    },[])
  return (
    <div>You're verified you will redirected to home page</div>
  )
}

export default Verify