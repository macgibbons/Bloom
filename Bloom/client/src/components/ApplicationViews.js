import React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";

export default function ApplicationViews() {
  return (
    <>
      <Route exact path="/" render={() => <Home />} />
    </>
  );
}
