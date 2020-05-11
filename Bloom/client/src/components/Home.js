import React, { useState, useEffect, useRef } from 'react';
import { createAuthHeaders } from '../API/userManager';
import BrewMethodList from './equiptment/brewMethods/BrewMethodList';
import StarRating from './StarRating';
import gsap, { Power3 } from 'gsap';


function Home() {

  
    return (
      <>
        <h1  className="title">What are you brewing today?</h1>

        <div>
          <BrewMethodList />
        </div>
      </>
    )
}

export default Home;