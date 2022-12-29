import React from 'react'
import './header.css';
import Navbar from '../navbar/navbar'
const Header = ({onAdd,header}) => {
  return (
    <>
    <section className="header fixed-top">
    <section className="header-top">
    <h1 className='HeaderH1'>SIMPPWEY</h1> 
      <section className="header-top__navbar">
        <section className="header-top__navigation">
          <Navbar onAdd={onAdd} header={header}/>
        </section>
      </section>
    </section>
    <section className="header-bottom">
      <section className="header-bottom__phone">
        {/* 9390616131 */}
      </section>
      <section className="header-bottom__email">
        {/* lakanavarapu.manikanta@zopsmart.com */}
      </section>
    </section>
  </section>
  
 </>
  )
}

export default Header