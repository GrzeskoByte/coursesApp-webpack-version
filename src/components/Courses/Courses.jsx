import React, { useContext } from "react";

import Course from "../../Course/Course";

import { StoreContext } from "../../store/StoreProvider";

import bemCssModules from "bem-css-modules";

import { default as CoursesStyles } from "./Courses.module.scss";

const style = bemCssModules(CoursesStyles);

const Courses = () => {
  const { courses } = useContext(StoreContext);

  const coursesElement = courses.map((course) => (
    <Course key={course.id} {...course} />
  ));
  console.log(courses[0]);
  return (
    <section className={style()}>
      <h2 className={style("title")}>Oferta kursów</h2>
      <ul className={style("list")}>{coursesElement}</ul>
    </section>
  );
};

export default Courses;
