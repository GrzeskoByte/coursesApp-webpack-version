import React, { useContext, useEffect, useState } from "react";
import bemCssModules from "bem-css-modules";

import { StoreContext } from "../../store/StoreProvider";

import { default as LoginFormStyles } from "./LoginForm.module.scss";

import Modal from "../Modal/Modal";

const style = bemCssModules(LoginFormStyles);

const LoginForm = ({ handleOnClose, isModalOpen }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [validateMessage, setValidateMessage] = useState("");

  const { setUser, users } = useContext(StoreContext);

  const handleOnChangeLogin = ({ target: { value } }) => setLogin(value);
  const handleOnChangePassword = ({ target: { value } }) => setPassword(value);
  const handleOnCloseModal = (e) => {
    e.preventDefault();
    handleOnClose();
  };

  const resetStateOfInputs = () => {
    setLogin("");
    setPassword("");
    setValidateMessage("");
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    for (const user of users) {
      if (user.login === login && user.password === password) {
        setUser({
          login,
          password,
          authority: user?.authority,
          courses: user.courses,
        });
        resetStateOfInputs();
        handleOnClose();
        break;
      } else setValidateMessage("Nieprawidłowe dane logowania");
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      resetStateOfInputs();
    }
  }, [isModalOpen]);

  const validateMessageComponent = validateMessage.length ? (
    <p className={style("validate-message")}>{validateMessage}</p>
  ) : null;

  return (
    <Modal
      handleOnClose={handleOnClose}
      isOpen={isModalOpen}
      shouldBeCloseOnOutsideClick={true}
    >
      {validateMessageComponent}

      <form className={style()} method="post" onSubmit={handleOnSubmit}>
        <div className={style("row")}>
          <label>
            Login:
            <input onChange={handleOnChangeLogin} type="text" value={login} />
          </label>
        </div>
        <div className={style("row")}>
          <label>
            Hasło:
            <input
              onChange={handleOnChangePassword}
              type="password"
              value={password}
            />
          </label>
        </div>
        <div className={style("row")}>
          <label>
            <button type="submit">Zaloguj</button>
            <button onClick={handleOnCloseModal} type="button">
              Anuluj
            </button>
          </label>
        </div>
      </form>
    </Modal>
  );
};

export default LoginForm;
