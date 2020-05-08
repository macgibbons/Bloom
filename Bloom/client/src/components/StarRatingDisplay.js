import React, { useState, useEffect, Component } from "react";
import { FaStar } from "react-icons/fa";

const StarRatingDisplay = (props) => {

    const [rating, setRating] = useState(null)
    const displayRating = props.displayRating

    useEffect(() => {
        setRating(displayRating)
    });

    return (

        <div className="stars">
            {[...Array(5)].map((star, i) =>{
                const ratingValue = i + 1;

                return (
                    <label>
                    <input type="radio" name="rating" 
                        value={displayRating} 
                        />

                    <FaStar className="star--display" size={25} color={ ratingValue <= (rating) ? "#ffc107" : "#e4e5e9"}/>

                </label> )
                    })}

            
        </div>
    )
}


export default StarRatingDisplay;