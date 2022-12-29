import React from "react";
import "./userprop.css";

const Userprop = () => {
  return (
    <div className="containerProp">
      <div className="horizontal">
        <div className="vertical">
          <h1>Course Name</h1>
        </div>
      </div>
      <div className="horizontal">
        <div className="verticals four">
          <div className="dealwrapper purple">
            <div className="list-group">
              <a href="#" className="list-group-item">
                <h4 className="heading">List group item heading</h4>
                <p className="text">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </p>
              </a>

              <a href="#" className="list-group-item">
                <h4 className="heading">List group item heading</h4>
                <p className="text">
                  {" "}
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop.
                </p>
              </a>
            </div>
          </div>
          ​
        </div>

        <div className="verticals four">
          <div className="dealwrapper red">
            <div className="ribbon-wrapper">
              <div className="ribbon-tag">Trending</div>
            </div>
            <div className="list-group">
              <a href="#" className="list-group-item">
                <h4 className="heading">List group item heading</h4>
                <p className="text">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </p>
              </a>

              <a href="#" className="list-group-item active">
                <h4 className="heading">List group item heading</h4>
                <p className="text">
                  When an unknown printer took a galley of type and scrambled it
                  to make a type specimen book. It has survived not only five
                  centuries.
                </p>
              </a>

              <a href="#" className="list-group-item">
                <h4 className="heading">List group item heading</h4>
                <p className="text">
                  {" "}
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop.
                </p>
              </a>
            </div>
          </div>
          ​
        </div>

        <div className="verticals four">
          <div className="dealwrapper blue">
            <div className="ribbon-wrapper">
              <div className="ribbon-tag">Upcoming</div>
            </div>
            <div className="list-group">
              <a href="#" className="list-group-item">
                <h4 className="heading">List group item heading</h4>
                <p className="text">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </p>
              </a>

              <a href="#" className="list-group-item active">
                <h4 className="heading">List group item heading</h4>
                <p className="text">
                  When an unknown printer took a galley of type and scrambled it
                  to make a type specimen book. It has survived not only five
                  centuries.
                </p>
              </a>

              <a href="#" className="list-group-item">
                <h4 className="heading">List group item heading</h4>
                <p className="text">
                  {" "}
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop.
                </p>
              </a>
            </div>
          </div>
          ​
        </div>
      </div>
      <div className="horizontal">
        <div className="vertical">
          <p>
            Follow me on Twitter:{" "}
            <a href="https://twitter.com/mrdogra007/" target="_blank">
              @mrdogra007
            </a>
          </p>
        </div>
      </div>
      ​
    </div>
  );
};

export default Userprop;
