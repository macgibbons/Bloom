import React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import { BeanProvider } from "./beans/BeanProvider";
import BeanList from "./beans/BeanList";
import GrinderList from "./equiptment/Grinders/GrinderList";
import { GrinderProvider } from "./equiptment/Grinders/GrinderProvider";

export default function ApplicationViews() {
  return (
    <>
    <BeanProvider>
      <GrinderProvider>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/Coffee" render={() => <BeanList />} />
        <Route exact path="/Equiptment" render ={() => <GrinderList />} />
      </GrinderProvider>
    </BeanProvider>
     

    </>
  );
}
