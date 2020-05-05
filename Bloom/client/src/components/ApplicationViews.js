import React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import { BeanProvider } from "./beans/BeanProvider";
import BeanList from "./beans/BeanList";

export default function ApplicationViews() {
  return (
    <>
    <BeanProvider>
      {/* <Route exact path="/" render={() => <Home />} /> */}
      <Route exact path="/" render={() => <BeanList />} />

    </BeanProvider>
     

    </>
  );
}
