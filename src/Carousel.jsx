import React, { useState, useEffect } from "react";
import { shortList, list } from "./data";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Carousel = () => {
  const [people, setPeople] = useState(list);
  const [curIndex, setCurIndex] = useState(0);

  const prevSlide = () =>
    setCurIndex((prevIndex) => (prevIndex - 1 + people.length) % people.length);

  const nextSlide = () =>
    setCurIndex((prevIndex) => (prevIndex + 1) % people.length);

  useEffect(() => {
    let slideId = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(slideId);
  }, [curIndex]);

  return (
    <section className="slider-container">
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person;
        return (
          <article
            className="slide"
            style={{
              transform: `translateX(${100 * (personIndex - curIndex)}%)`,
              opacity: personIndex === curIndex ? 1 : 0,
              visibility: personIndex === curIndex ? "visible" : "hidden",
            }}
            key={id}
          >
            <img src={image} alt={name} className="person-img" />
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
          </article>
        );
      })}
      <div className="btn-container">
        <button onClick={prevSlide} className="prev">
          <FiChevronLeft />
        </button>
        <button onClick={nextSlide} className="next">
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Carousel;
