import React, { useState, useContext } from "react";
import { StoreContext } from "../../store/StoreProvider";
import CourseDeatils from "./subcomponents/CourseDetails";
import CoursePopup from "./subcomponents/CoursePopup";

const AdminPanel = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const showPopUp = () => setIsOpenPopup(true);

  const hidePopUp = (e) => {
    if (e) {
      e.preventDefault();
    }
    setIsOpenPopup(false);
  };

  const { courses } = useContext(StoreContext);

  const coursesElements = courses.map((course) => (
    <CourseDeatils key={course.id} {...course} />
  ));

  return (
    <section>
      {coursesElements}
      <button onClick={showPopUp}>Dodaj nowy kurs</button>
      <CoursePopup
        isEditMode={false}
        isOpenPopup={isOpenPopup}
        hidePopup={hidePopUp}
      />
    </section>
  );
};

export default AdminPanel;
