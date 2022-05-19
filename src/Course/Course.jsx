import React from "react";

import bemCssModules from "bem-css-modules";

import { default as CourseStyles } from "./Course.module.scss";

const style = bemCssModules(CourseStyles);

const Course = ({ authors, img, price, title }) => {
  const allAuthors = authors.join(", ");

  const handleClick = async () => {
    console.warn("error");
  };

  return (
    <article className={style()}>
      <h3 className={style("title")}>{title}</h3>
      <img src={img} alt={title} className={style("image")} />
      <p className={style("price")}>{`Koszt kursu : ${price}zł`}</p>
      <p className={style("authors")}>{`Autorzy kursu : ${allAuthors} `}</p>
      <button onClick={handleClick}>Zakup ten kurs</button>
    </article>
  );
};

export default Course;
