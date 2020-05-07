import React, { useState, useEffect } from 'react';
import { createAuthHeaders } from '../API/userManager';
import BrewMethodList from './equiptment/brewMethods/BrewMethodList';
import StarRating from './StarRating';

function Home() {
  const [values, setValues] = useState([]);

  useEffect(() => {
    const authHeader = createAuthHeaders();
    fetch('/api/v1/values', {
      headers: authHeader
    })
      .then(response => response.json())
      .then(setValues);
  }, []);

  
    return (
      <>
        <h1 className="title">What are you brewing today?</h1>
        
        <BrewMethodList />
      </>
    )
}

export default Home;