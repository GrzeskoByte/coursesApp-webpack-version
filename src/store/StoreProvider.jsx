import React, { createContext, useEffect, useState } from "react";
import request from "../helpers/request";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);

  const users = [
    {
      login: "admin",
      password: "admin",
      authority: 1,
      courses: [],
    },
    {
      login: "user",
      password: "user",
      authority: 0,
      courses: [1, 3, 5],
    },
  ];

  const fetchData = async () => {
    const { data } = await request.get("/courses");

    setCourses(data.courses);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StoreContext.Provider
      value={{ courses, setCourses, user, setUser, users }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
