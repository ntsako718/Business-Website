import React from "react";
import Button from "../Components/UI/Button";
import "./CSS/Hero.css";
 
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__overlay">
        <h1 className="hero__brand">Hlwekiso</h1>
        <Button className="hero__cta">Shop Now</Button>
      </div>
    </section>
  );
}