import React, { useState } from "react";
import "./course.css";

const Video = ({ title, description, video_url }) => {
  const video = document.querySelector('video')
  console.log("cool")
  if(video){
  console.log("cool1")
video.addEventListener('play', (event) => {
  console.log('The Boolean paused property is now false. Either the ' +
  'play() method was called or the autoplay attribute was toggled.');
});


video.addEventListener('pause', (event) => {
    console.log('The Boolean paused property is now true. Either the ' +
    'pause() method was called or the autoplay attribute was toggled.');
  });
  video.addEventListener('ended', (event) => {
    console.log('Video stopped either because 1) it was over, ' +
        'or 2) no further data is available.');
  });
}
  const [playPause, setPlayPause] = useState(false);
  const [videoPlay, setVideoPlay] = useState(false);
  return (
    <>
      {" "}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="d-grid gap-2 dropdown-courses">
        <button
          className="btn btn-light video-button"
          type="button"
          onClick={() => {
            setVideoPlay(!videoPlay);
            setPlayPause(!playPause);
          }}
        >
          <div className="cool" />
          {!playPause && <i className="fa fa-play video-icon"></i>}
          {playPause && <i className="fa fa-pause video-icon"></i>}
          <h6 className="heading">{title}</h6>
          {playPause && <p>{description}</p>}
          <div />

          <div id="instructions">
            {videoPlay && (
              <video
                id="video"
                className="video-js vjs-default-skin"
                width="680px"
                height="267px"
                controls
                preload="none"
                poster="https://i.ytimg.com/vi/sBws8MSXN7A/maxresdefault.jpg"
                data-setup='{ "aspectRatio":"640:267", "playbackRates": [1, 1.5, 2] }'
              >
                <source
                  src="https://vjs.zencdn.net/v/oceans.mp4"
                  type="video/mp4"
                />
                <source src={video_url} type="video/webm" />
              </video>
            )}
          </div>
        </button>
      </div>
    </>
  );
};

export default Video;
