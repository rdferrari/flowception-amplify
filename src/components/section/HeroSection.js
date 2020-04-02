import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="section-hero-container">
      <Link to="/sections">
        <img
          className="section-hero-image"
          src="/images/app-logo.svg"
          alt="Mate ware ware logo"
        />
        <div className="section-hero-tag-container">
          <h1 className="section-hero-tag">
            Maumahara ka mau <br /> oranga, ake, ake.
          </h1>
          <p className="section-hero-subtag">
            To hold a memory is to hold a <br />
            lifetime for ever and ever.
          </p>
          {/* <button className="primary-button button-dark">Learn more</button> */}
          <p className="section-hero-disclaimer">Disclaimer</p>
        </div>
      </Link>
    </div>
  );
};

export default HeroSection;
