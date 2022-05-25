import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import bemCssModules from "bem-css-modules";

import { StoreContext } from "../store/StoreProvider";

import { default as CourseStyles } from "./Course.module.scss";
import request from "../helpers/request";

const style = bemCssModules(CourseStyles);

const Course = ({ authors, id, img, isUserContext = false, price, title }) => {
  const { user, setUser } = useContext(StoreContext);
  const allAuthors = authors.join(", ");
  const isUserLogged = Boolean(user);
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const { data, status } = await request.patch("/users", {
        login: user.login,
        courseId: id,
      });
      console.log(data);
      if (status === 200) {
        setUser(data.user);
        navigate("/my-courses");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const shouldBuyButton = isUserLogged && !isUserContext;

  return (
    <article className={style()}>
      <h3 className={style("title")}>{title}</h3>
      <img src={img} alt={title} className={style("image")} />
      <p className={style("price")}>{`Koszt kursu : ${price}zł`}</p>
      <p className={style("authors")}>{`Autorzy kursu : ${allAuthors} `}</p>
      {shouldBuyButton && <button onClick={handleClick}>Zakup ten kurs</button>}
    </article>
  );
};

export default Course;
