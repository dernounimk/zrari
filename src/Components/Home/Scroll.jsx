import React from 'react'

function Scroll({mood}) {
    const theMood = mood;
  return (
    <div className='home-scroll'>
      <a href="#about" className={`scroll-btn ${theMood} btn-flex`}>
      <svg
                width="32px"
                height="32px"
                className="home-scroll-mouse"
                viewBox="0 0 247 390"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                  fillRule= "evenodd"
                  clipRule= "evenodd"
                  strokeLinecap= "round"
                  strokeLinejoin= "round"
                  strokeMiterlimit= "1.5"
              >
                <path
                  className="wheel"
                  d="M123.359,79.775l0,72.843"
                    fill="none"
                    stroke= {theMood === "dark" ? "#fff" : "#1f1e1e"}
                    strokeWidth ="20px"
                ></path>
                <path
                  id="mouse"
                  d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"

                    fill= "none"
                    stroke= {theMood === "dark" ? "#fff" : "#1f1e1e"}
                    strokeWidth= "20px"
                ></path>
              </svg>
              <span className='scroll-text'>Scroll Down</span>
              <i className="uil uil-arrow-down"></i>
      </a>
    </div>
  )
}

export default Scroll
