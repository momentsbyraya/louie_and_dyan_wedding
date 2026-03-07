import React from 'react'
import '../assets/css/Loader.css'

const Loader = ({ className = '' }) => {
  return (
    <div className={`loader-container ${className}`}>
      <div className="preloader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="loader-shadow"></div>
    </div>
  )
}

export default Loader
