import React from "react";
import "./navbar.css";
import {Link} from 'react-router-dom'


const Navbar = ({onAdd,header}) => {
  return (
    <section className="navbar">
   <Link to="/home"  className="NavCss"><h6 className="navbar-item"> Home</h6></Link>
   <Link to="/about" className="NavCss" ><h6 className="navbar-item"> About</h6></Link>
  {header && <Link to="/mycourses" className="NavCss" ><h6 className="navbar-item"> My courses</h6></Link>}
  {!header && <Link to="/signup" className="NavCss" ><h6 className="navbar-item"> signup</h6></Link> }
  {!header && <Link to="/login" className="NavCss" ><h6 className="navbar-item"> signin</h6></Link> }
  {header && <Link to="/checkout"  className="NavCss"><h6 className="navbar-item"> Checkout</h6></Link> }
  {header && <Link to="/cart"  className="NavCss"><h6 className="navbar-item"> MyCart</h6></Link> }
  {header && <Link to="/login"  className="NavCss"><h6 className="navbar-item" onClick={onAdd}> Logout</h6></Link> }
  {header &&<Link to="/profile" className="NavCss"><i className="fas fa-user-circle navbar-item1" aria-hidden="true"><h6>MyProfile</h6></i></Link>}
    </section>
  );
};

export default Navbar;
