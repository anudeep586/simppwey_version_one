import React, { useEffect,useState } from "react";
import "./profile.css";
import {storage} from '../firebase'
import {ref, uploadBytes} from 'firebase/storage'
import {v4} from'uuid'



const Profile = () => {
  const [fileUpload,setFileUpload]=useState(null)
  const uploadFile=()=>{
    if(fileUpload===null){return null}
    const fileRef=ref(storage,`files/${fileUpload.name+v4()}`)
    uploadBytes(fileRef,fileUpload).then(()=>{
      alert("file upload is done")
    })
  }
  const [username,setUserName]=useState('')
    const [address,setAddress]=useState('')
    const [mobileNo,setMobileNo]=useState('')
    const [githubLink,setGithubLink]=useState('')
    const [twitterLink,setTwitterLink]=useState('')
    const [email,setEmail]=useState('')
    const [Username,setuserName]=useState('')
    const [Address,setaddress]=useState('')
    const [MobileNo,setmobileNo]=useState('')
    const [GithubLink,setgithubLink]=useState('')
    const [TwitterLink,settwitterLink]=useState('')
    const onSubmit=async(e)=>{
      e.preventDefault()
      let token = localStorage.getItem("jwtToken");
     const data= await fetch(`http://localhost:8080/additional `,{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          token: 'bearer '+token, 
        },
        body:JSON.stringify({username:Username,address:Address,mobile:MobileNo,githubLink:GithubLink,twitterLink:TwitterLink})
      })
    const jsonData=await data.json();
    setUserName(jsonData[0].username)
    setAddress(jsonData[0].address)
    setEmail(jsonData[0].email)
    setMobileNo(jsonData[0].mobile)
    setGithubLink(jsonData[0].githubLink)
    setTwitterLink(jsonData[0].twitterLink)
    // onAdd()
  }

  useEffect(()=>{
    var el = document.getElementById("editButton");
    console.log(el,emo);
    if (el) {
      el.addEventListener("click", function () {
        document.querySelector(".bg-modal").style.display = "flex";
      });
    }
    var emo = document.querySelector(".close");
    if (emo) {
      emo.addEventListener("click", function () {
        document.querySelector(".bg-modal").style.display = "none";
      });
    }
    var clickSubmit=document.querySelector(".EditProfileSubmit");
    if(clickSubmit){
      clickSubmit.addEventListener("click", function () {
        document.querySelector(".bg-modal").style.display = "none";
      });
    }
    const profile=async()=>{
      let token = localStorage.getItem("jwtToken");
     const data= await fetch(`http://localhost:8080/getprofile `,{
        method:"GET",
        headers:{
          'Content-Type':'application/json',
          token: 'bearer '+token, 
        },
      })
    const jsonData=await data.json();
    console.log(jsonData)
    setUserName(jsonData[0].username)
    setAddress(jsonData[0].address)
    setEmail(jsonData[0].email)
    setMobileNo(jsonData[0].mobile)
    setGithubLink(jsonData[0].githubLink)
    setTwitterLink(jsonData[0].twitterLink)
    }
    profile()
  })
  return (
    <>
      <section className="profile12">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4 col54">
              <div className="card mb-4">
                <div className="card-body carding text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid profile123"
                  />
                  <h5 className="my-3">{username!==undefined?username:"example"}</h5>
                  <p className="text-muted mb-1">Full Stack Developer</p>
                  <p className="text-muted mb-4">{address!==undefined?address:"addreesss"}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <a href="#" id="editButton" className="editButton">
                      Edit Me
                    </a>
                    <button
                      type="button"
                      className="btn btn-outline-primary ms-1"
                    >
                      Message
                    </button>
                  </div>
                </div>
              </div>
              <div className="card mb-4 mb-lg-0">
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush rounded-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fas fa-globe fa-lg text-warning"></i>
                      <p className="mb-0"><a href="https://simppwey.com" className="anchorTag">Simppwey</a></p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fab fa-github fa-lg class1"></i>
                      <p className="mb-0">{githubLink!==undefined?githubLink:"github.com"}</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fab fa-twitter fa-lg class2"></i>
                      <p className="mb-0">{twitterLink!==undefined?twitterLink:"@twitter"}</p>
                    </li>

                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col54">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{username!==undefined?username:"username"}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{mobileNo}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Mobile</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">(098) 765-4321</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="mb-4">
                        <span className="text-primary font-italic me-1">
                          Courses
                        </span>{" "}
                       Status
                      </p>
                      <p className="mb-1 classnm">Javascript</p>
                      <div className="progress rounded classnm1">
                        <div
                          className="progress-bar classnm2"
                          role="progressbar"
                          aria-valuenow="80"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1 classnm3">Typescript</p>
                      <div className="progress rounded classnm4">
                        <div
                          className="progress-bar classnm5"
                          role="progressbar"
                          aria-valuenow="72"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1 classnm6">Koa</p>
                      <div className="progress rounded classnm7">
                        <div
                          className="progress-bar classnm8"
                          role="progressbar"
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1 classnm9">Python</p>
                      <div className="progress rounded classnm10">
                        <div
                          className="progress-bar classnm11"
                          role="progressbar"
                          aria-valuenow="55"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1 classnm12">Backend API</p>
                      <div className="progress rounded mb-2 classnm13">
                        <div
                          className="progress-bar classnm14"
                          role="progressbar"
                          aria-valuenow="66"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* //modal */}
      <div className="bg-modal">
        <div className="modal-contents">
          <div className="close">+</div>

          <form onSubmit={onSubmit}>
            <h2>Edit Profile</h2>
            <input className="profileModal" type="text" placeholder="Name" value={Username} onChange={(e)=>setuserName(e.target.value)}/>
            <input className="profileModal" type="text" placeholder="Address" value={Address} onChange={(e)=>setaddress(e.target.value)}/>
            <input className="profileModal" type="text" placeholder="Mobile No" value={MobileNo} onChange={(e)=>setmobileNo(e.target.value)}/>
            <input className="profileModal" type="text" placeholder="githubLink" value={GithubLink} onChange={(e)=>setgithubLink(e.target.value)}/>
            <input className="profileModal" type="text" placeholder="TwitterLink" value={TwitterLink} onChange={(e)=>settwitterLink(e.target.value)}/>
            <button href="#" className="btn btn-primary EditProfileSubmit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <input type="file" onChange={(event)=>{setFileUpload(event.target.files[0])}}/>
      <button onClick={uploadFile}>Upload Files</button>
    </>
  );
};

export default Profile;
