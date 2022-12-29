import React, { useEffect, useState } from "react";
import CheckoutList from "./checkoutList";
import axios from "axios";
import Payment from "./payment";


const Checkout = () => {
  const [checkoutCourses, setcheckoutCourses] = useState([]);
  const [priceofCheckout, setPrice] = useState({});
  const [promocode, setPromoCode] = useState("");
  const [promocodeValue, setPromoCodeValue] = useState(0);
  const [originalVal, setOriginalVal] = useState(0);
  const [secondCode, setsecondCode] = useState("");

  const initPayment=async(data)=>{
    console.log(data)
    const options = {
        key: "rzp_live_zCrgCaskGkFYAt",
        amount: data.amount,
        currency: data.currency,
        name: "FourPack",
        description: "Transaction",
        image: "https://cdn.pixabay.com/photo/2020/02/07/12/40/emoji-4827057_960_720.png",
        order_id: data.id,
        handler: async (response) => {
          try {
            const verifyUrl = "http://localhost:8080/api/payment/verify";
            const { data } = await axios.post(verifyUrl, response);
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    };
  const payment=async(e)=>{
    e.preventDefault()
    console.log("cool",originalVal)
    try{
      const data = await fetch(`http://localhost:8080/api/payment/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount:1}),
    });
    const result = await data.json();
    console.log(result)
    initPayment(result.data)
    }
    catch(err){
        console.log(err)
    } 
  }


  const onSubmit = (e) => {
    e.preventDefault();
    setPromoCode(promocode);
    const getToken = localStorage.getItem("jwtToken");
    const check = async () => {
      const data = await fetch(
        `http://localhost:8080/promocode/${promocode}/${originalVal.price}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: "bearer " + getToken,
          },
        }
      );
      const result = await data.json();
      setPromoCode("");
      alert(result.msg);
      setPromoCodeValue(result.discountPrice);
      setsecondCode(promocode);
      const priceAfterPromo = {
        price: originalVal.price - result.discountPrice,
      };
      setPrice(priceAfterPromo);
      if (promocodeValue === 0) {
        setPrice(priceAfterPromo);
      }
    };
    check();
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
      setcheckoutCourses(result);
    };
    check();
    const price = async () => {
      const getToken = localStorage.getItem("jwtToken");
      const data = await fetch(`http://localhost:8080/price`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: "bearer " + getToken,
        },
      });
      const result = await data.json();
      setPrice(result);
      setOriginalVal(result);
    };
    price();
  }, []);

  return (
    <>
      <div className="container">
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj"
        ></script>
        <div className="py-5 text-center">
          <h2 className="text-muted">Checkout</h2>
          <p className="lead"></p>
        </div>
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">
                {checkoutCourses.length}
              </span>
            </h4>
            <ul className="list-group mb-3">
              {checkoutCourses.map((course) => (
                <CheckoutList price={course.price} title={course.title} />
              ))}
              <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-success">
                  <h6 className="my-0">Promo code</h6>
                  <small>{secondCode}</small>
                </div>
                <span className="text-success">-${promocodeValue}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${priceofCheckout.price}</strong>
              </li>
            </ul>
            <form className="card p-2" onSubmit={onSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                  value={promocode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                  }}
                required/>
                <div className="input-group-append">
                  <button type="submit" className="btn btn-secondary">
                    Redeem
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3 text-muted">Billing address</h4>
            <form className="needs-validation" noValidate>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName text-muted">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback text-muted">
                    Valid first name is required.
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName text-muted">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback text-muted">
                    Valid last name is required.
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="username text-muted">Username</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">@</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    required
                  />
                  <div className="invalid-feedback" style={{ width: "100%" }}>
                    Your username is required.
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email">
                  Email <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                  required
                />
                <div className="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  required
                />
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="address2">
                  Address 2 <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  placeholder="Apartment or suite"
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-5 mb-3">
                  <label htmlFor="country">Country</label>
                  <select
                    className="custom-select d-block w-100"
                    id="country"
                    required
                  >
                    <option>Choose...</option>
                    <option>India</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="state">State</label>
                  <select
                    className="custom-select d-block w-100"
                    id="state"
                    required
                  >
                    <option>Choose...</option>
                    <option>AndhraPradesh</option>
                    <option>UP</option>
                    <option>TamilNadu</option>
                    <option>Karnataka</option>
                    <option>Delhi</option>
                    <option>Mumbai</option>
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="zip">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>
              <button
                className="btn btn-primary btn-lg btn-block"  onClick={(e)=>payment(e)}
              > Continue to checkout
              </button>
            </form>
            <Payment/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
