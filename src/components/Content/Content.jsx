import React, { useContext } from "react";

import Courses from "../Courses/Courses";
import UserCourses from "../UserCourses/UserCourses";

import { StoreContext } from "../../store/StoreProvider";

import bemCssModules from "bem-css-modules";
import { Routes, Route } from "react-router-dom";

import { default as ContentStyles } from "./Content.module.scss";

const style = bemCssModules(ContentStyles);

const ADMIN_TYPE = 1;

const Content = () => {
  const { user } = useContext(StoreContext);

  const isUserLogged = Boolean(user);
  const isAdmin = user?.authority === ADMIN_TYPE;

  return (
    <main className={style()}>
      <Routes>
        <Route exact path="/" element={<Courses />} />

        {isUserLogged && (
          <Route exact path="/my-courses" element={<UserCourses />} />
        )}

        {isAdmin && (
          <Route
            exact
            path="/manage-courses"
            element={<p>Zarządzanie kursami </p>}
          />
        )}
      </Routes>
    </main>
  );
};

export default Content;
