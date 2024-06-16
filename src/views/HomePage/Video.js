import React from 'react'

function Video() {
  return (
    <div className=" embed-responsive-4by3 ">
      <h1 className="display-1 text-center floating-lg ">
          Bienvenue sur IRESCOMATH
        </h1>
        <video autoPlay loop muted className="embed-responsive">
          <source
            src={require("../../assets/img/brand/video3.mp4")}
            type="video/mp4"
          />
        </video>
      </div>
  )
}

export default Video