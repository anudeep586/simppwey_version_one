import React from 'react'
import { Routes, Route} from "react-router-dom"
import Course from './course/course'
import Home from './home/home'
import Login from './auth/login'
import Signup from './auth/signup'
import About from './about/about'
import Checkout from './checkout/checkout'
import Cart from './cart/cart'
import Verify from './auth/verify'
import Profile from './profile/profile'
import Userprop from './userprop/userprop'


const Views = ({onAdd,courses,onChangeCourses,getCourseById,courseById,footer,setFooter,setCourses}) => {
  
  return (
    <Routes>
      <Route path="/verifying/:id" element={<Verify/>}/>
      <Route path="/signup" element={<Signup onAdd={onAdd}/>}/>
      <Route path="/login" element={<Login onAdd={onAdd} courses={courses} onChangeCourses={onChangeCourses}/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/usercourses" element={<Userprop/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/" element={<Home onAdd={onAdd} courses={courses} getCourseById={getCourseById} setCourses={setCourses}/>} />
      <Route path="/home" element={<Home onAdd={onAdd} courses={courses} getCourseById={getCourseById} setCourses={setCourses}/>} />
      <Route path="home/course">
        <Route path=":id" element={<Course courseById={courseById} getCourseById={getCourseById}/>}/>
      </Route>
      <Route path="/course">
         <Route path=":id" element={<Course courseById={courseById} getCourseById={getCourseById}/>}/>
      </Route>
    <Route path="*" element={<div>404 Not Found</div>}/>
    </Routes>
  )
}

export default Views