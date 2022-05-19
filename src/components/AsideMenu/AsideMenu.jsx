import React, { useContext } from "react";

import bemCssModules from "bem-css-modules";

import { default as AsidemenuStyles } from "./AsideMenu.module.scss";

import { StoreContext } from "../../store/StoreProvider";

import UserMenu from "./subcomponents/UserMenu";
import AdminMenu from "./subcomponents/AdminMenu";

const style = bemCssModules(AsidemenuStyles);

const ADMIN_TYPE = 1;

const AsideMenu = () => {
  const { user } = useContext(StoreContext);

  const adminMenuComponent =
    user?.authority === ADMIN_TYPE ? <AdminMenu /> : null;

  return (
    <section className={style()}>
      <div className={style("nav-wrapper")}>
        <UserMenu isUserLogged={Boolean(user)} />
        {adminMenuComponent}
      </div>
    </section>
  );
};

export default AsideMenu;
