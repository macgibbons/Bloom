import React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import { BeanProvider } from "./beans/BeanProvider";
import BeanList from "./beans/BeanList";
import GrinderList from "./equiptment/Grinders/GrinderList";
import { GrinderProvider } from "./equiptment/Grinders/GrinderProvider";
import BrewMethodList from "./equiptment/brewMethods/BrewMethodList";
import { BrewMethodProvider } from "./equiptment/brewMethods/BrewMethodProvider";
import GrinderForm from "./equiptment/Grinders/GrinderForm";

export default function ApplicationViews() {
  return (
    <>
    <BrewMethodProvider>
      <BeanProvider>
        <GrinderProvider>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/Coffee" render={() => <BeanList />} />
          <Route exact path="/Equiptment" render ={() => <GrinderList />} />

          <Route exact path="/Grinders/create" render = {
                            props => <GrinderForm {...props} />
                        } />
        </GrinderProvider>
      </BeanProvider>
    </BrewMethodProvider>

    </>
  );
}
