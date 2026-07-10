import React from "react";
import Button from "../Components/UI/Button";
import "./CSS/Hero.css";

export default function Hero() {
  return (
    <>
      <section className="hero">
        <div className="hero__overlay">
          <h1 className="hero__brand">Hlwekiso</h1>
          <Button className="hero__cta">Shop Now</Button>
        </div>
      </section>

      <section class="brand-promise">
        <div class="brand-promise__container">
          <h2 class="brand-promise__heading">Experience a Deeper Clean</h2>
          <p class="brand-promise__text">
            Discover our range of premium, high-performance cleaning essentials
            designed to tackle tough stains and keep your home fresh and spotless.
          </p>
        </div>
      </section>

    </>

  );
}