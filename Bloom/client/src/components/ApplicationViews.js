import React, { Component } from "react";
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
import BrewForm from "./brews/BrewForm";
import BrewDetails from "./brews/BrewDetails";
import { CSSTransition } from "react-transition-group";
import gsap from "gsap";
import '../App.scss'

export default function ApplicationViews(props) {
  const routes = [
    // { path: "/", name: "Home", Component:  BrewMethodList },
    { path: "/Coffee", name: "Coffee", Component: BeanList}, 
    { path: '/Brews', name: "brews", Component: BrewList, props: {...props}},
    { path: '/brews/:brewId(\d+)', name: "brewDetails", Component: BrewDetails },
    { path: '/grinders/create', name: "grinderForm", Component: GrinderForm }
  ]

  const onEnter = node => {
    console.log(node.children[0].lastElementChild)
    gsap.from([node.children[0].firstElementChild, (node.children[0].lastElementChild)], .6,
      {
        y: 30,
        delay: .6,
        ease: 'power3.InOut',
        opacity: 0,
        stagger: {
          amount: 0.6
        }
      })
  }

  const onExit = node => {
    gsap.to([node.children[0].firstElementChild, (node.children[0].lastElementChild)], .6,
      {
        y: -30,
        ease: 'power3.InOut',
        stagger: {
          amount: 0.6
        }
      })
  }

  return (
    <>
    <BrewProvider>
      <BrewMethodProvider>
        <BeanProvider>
          <GrinderProvider>
            <RegionProvider>
              { routes.map(({path, Component}) => (
                <Route key='name' exact path={path} >
                  {( {match} ) => (
                  <CSSTransition 
                  in={match != null} 
                  timeout={1200}
                  classNames="page"
                  unmountOnExit
                  onExit={onExit}
                  onEnter={onEnter}
                  >
                    <div className='page'>
                   <Component  {...props} />
                    </div>
                  </CSSTransition>
                ) }
                </Route>
              ))}



            
              <Route exact path="/" render={() => <BrewMethodList />} />
                
              {/* <Route exact path="/Coffee" render={(props) => <BeanList {...props} />} /> */}
              {/* <Route exact path="/Brews" render={(props) => <BrewList {...props} />} /> */}
              <Route exact path="/Equiptment" render ={() => <GrinderList />} />
              {/* <Route exact path="/Grinders/create" render = {
                                props => <GrinderForm {...props} />
                            } /> */}
              <Route exact path="/coffee/create" render = {
                                props => <BeanForm {...props} />
                            } />
            
              <Route exact path="/brews/create" render = {
                                props => <BrewForm {...props} />
                            } />
              <Route path="/brews/edit/:brewId(\d+)" render={
                            props => <BrewForm {...props} />
                        } />
              <Route path="/coffee/edit/:beanId(\d+)" render={
                            props => <BeanForm {...props} />
                        } />
                <Route  path="/brews/:brewId(\d+)" render={
     props => <BrewDetails {...props} />
 } />           
            </RegionProvider>
          </GrinderProvider>
        </BeanProvider>
      </BrewMethodProvider>
    </BrewProvider>

    </>
  );
}
