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
import BeanForm from "./beans/BeanForm";
import { RegionProvider } from "./regions/RegionProvider";
import { BrewProvider } from "./brews/BrewProvider";
import BrewList from "./brews/BrewList";

export default function ApplicationViews(props  ) {
  return (
    <>
    <BrewProvider>
      <BrewMethodProvider>
        <BeanProvider>
          <GrinderProvider>
            <RegionProvider>
              <Route exact path="/" render={() => <Home />} />
              <Route exact path="/Coffee" render={(props) => <BeanList {...props} />} />
              <Route exact path="/Brews" render={(props) => <BrewList {...props} />} />
              <Route exact path="/Equiptment" render ={() => <GrinderList />} />
              <Route exact path="/Grinders/create" render = {
                                props => <GrinderForm {...props} />
                            } />
              <Route exact path="/coffee/create" render = {
                                props => <BeanForm {...props} />
                            } />
            </RegionProvider>
          </GrinderProvider>
        </BeanProvider>
      </BrewMethodProvider>
    </BrewProvider>

    </>
  );
}
