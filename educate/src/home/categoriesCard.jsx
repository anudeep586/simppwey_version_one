import React from 'react'
import './home.css'

const CategoriesCard = ({logo,video}) => {
    const handleOnMouseOver=(e)=>{
        e.currentTarget.play();
    }
    const handleOnMouseOut=(e)=>{
        e.currentTarget.pause();
    }
  return (
    <div className='categoriesCard'>
      <div className="border" />
      <img src={logo} alt='logo' className='img'/>
      {/* <video
        loop
        preload='none'
        muted // Needs to be there to be able to play
        onMouseOver={handleOnMouseOver}
        onMouseOut={handleOnMouseOut}
      >
        <source src={video} type='video/mp4' />
      </video> */}
    </div>
  )
}

export default CategoriesCard