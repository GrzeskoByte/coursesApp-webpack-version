import React, { useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";

import "./App.scss";

import Header from "./components/Header/Header";
import StoreProvider from "./store/StoreProvider";
import AsideMenu from "./components/AsideMenu/AsideMenu";
import Content from "./components/Content/Content";

const App = () => {
  return (
    <StoreProvider>
      <Header></Header>
      <Router>
        <div className="content-wrapper">
          <AsideMenu />
          <Content />
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;
