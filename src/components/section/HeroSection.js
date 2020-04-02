import React from "react";

const HeroSection = ({ showHero, setShowHero }) => {
  return (
    showHero && (
      <div className="section-hero-container">
        <img
          className="section-hero-image"
          src="/images/app-logo.svg"
          alt="Mate ware ware logo"
        />
        <div
          onClick={() => setShowHero(false)}
          className="section-hero-tag-container"
        >
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
      </div>
    )
  );
};

export default HeroSection;
