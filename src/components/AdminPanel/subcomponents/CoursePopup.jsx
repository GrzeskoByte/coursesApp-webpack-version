import React, { useContext, useState } from "react";

import Modal from "../../Modal/Modal";

import bemCssModules from "bem-css-modules";

import { default as CoursePopupStyles } from "./CoursePopup.module.scss";
import { StoreContext } from "../../../store/StoreProvider";
import request from "../../../helpers/request";

const style = bemCssModules(CoursePopupStyles);

const CoursePopup = ({
  authors = [],
  hidePopup,
  isEditMode = true,
  isOpenPopup,
  id,
  img = "",
  price = 0,
  title = "",
}) => {
  const [formAuthors, setFormAuthors] = useState(authors);
  const [formAuthor, setAuthor] = useState("");
  const [formImg, setFormImg] = useState(img);
  const [formPrice, setFormPrice] = useState(price);
  const [formTitle, setFormTitle] = useState(title);

  const { setCourses } = useContext(StoreContext);

  const handleOnChangeAuthor = (e) => setAuthor(e.target.value);
  const handleOnChangeImg = (e) => setFormImg(e.target.value);
  const handleOnChangePrice = (e) => setFormPrice(e.target.value);
  const handleOnChangeTitle = (e) => setFormTitle(e.target.value);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const courseObject = {
      authors: formAuthors,
      img: formImg,
      price: Number(formPrice),
      title: formTitle,
    };

    if (isEditMode) {
      const { data, status } = await request.put("/courses", courseObject);

      courseObject.id = id;

      if (status === 202) {
        setCourses(data.courses);
      }
    } else {
      const { data, status } = await request.post("/courses", courseObject);

      if (status === 201) {
        setCourses(data.courses);
      }
    }

    hidePopup();
  };

  const addAuthor = (e) => {
    e.preventDefault();
    setFormAuthors((prev) => [...prev, formAuthor]);
    setAuthor("");
  };

  const deleteAuthor = (e) => {
    const authorToDelete = e.target.dataset.author;

    setFormAuthors((prev) =>
      prev.filter((author) => author !== authorToDelete)
    );
  };

  const authorsElements = formAuthors.map((author) => (
    <li key={author}>
      <span>{author}</span>
      <button data-author={author} onClick={deleteAuthor}>
        Usu??
      </button>
    </li>
  ));

  const correctLabel = isEditMode ? "Aktualizuj kurs" : "Utw??rz kurs";

  return (
    <Modal handleOnClose={hidePopup} isOpen={isOpenPopup}>
      <div className={style()}>
        <form
          className={style("form")}
          method="submit"
          onSubmit={handleOnSubmit}
        >
          <div className={style("form-row")}>
            <label>
              <p>Autor</p>
              <input
                type="text"
                className={style("input")}
                value={formAuthor}
                onChange={handleOnChangeAuthor}
              />

              <p>
                <button onClick={addAuthor}>Dodaj autora</button>
              </p>
            </label>
          </div>

          <div className={style("form-row")}>
            <label>
              <p> Adres obrazu</p>

              <input
                type="text"
                className={style("input")}
                value={formImg}
                onChange={handleOnChangeImg}
              />
            </label>
          </div>

          <div className={style("form-row")}>
            <label>
              <p>Cena</p>
              <input
                type="number"
                className={style("input")}
                value={formPrice}
                min={0}
                onChange={handleOnChangePrice}
              />
            </label>
          </div>

          <div className={style("form-row")}>
            <label>
              <p>Tytu??</p>
              <input
                type="text"
                className={style("input")}
                value={formTitle}
                onChange={handleOnChangeTitle}
              />
            </label>
          </div>

          <button type="submit">{correctLabel}</button>
          <button type="button" onClick={hidePopup}>
            Anuluj
          </button>
        </form>
        <ul className={style("author-list")}>
          <p>Lista autor??w</p>
          {authorsElements}
        </ul>
      </div>
    </Modal>
  );
};

export default CoursePopup;
