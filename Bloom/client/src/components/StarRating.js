import React, { useState, useEffect, Component } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = (props) => {

    // const setEditRating = () => {
    //     editMode ? setRating(props.editRating) : setRating(null)
    //     // if(editMode === true){
    //     //     setRating(props.editRating)
    //     // }
    // }

    const editMode = (Boolean) => {
        props.editMode(Boolean)
        
    }
    const editRating = editMode ? props.editRating : null;
     
     
    const [rating, setRating] = useState(null)
    
    const [hover, setHover] = useState(null)
    
    const functionHandler = (rating) => {

        props.selectedRating(rating);
        
        }

        functionHandler(rating)
        const editfunctionHandler = (rating) => {

            props.editRating(rating);
            
            }
            
 
        
        useEffect(() => {
                setRating(editRating)
          }, [editRating]);

    return (

        <div className="stars">
            {[...Array(5)].map((star, i) =>{
                const ratingValue = i + 1;

                return (
                    <label>
                    <input type="radio" name="rating" 
                        value={ratingValue} 
                        onClick={ () => setRating(ratingValue) }/>

                    <FaStar className="star" size={25} color={ ratingValue <= (hover || rating  ) ? "#ffc107" : "#e4e5e9"} 
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                        />

                </label> )
                    })}

            
        </div>
    )
}


export default StarRating;