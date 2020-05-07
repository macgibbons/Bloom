import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = (props) => {

    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)

    const functionHandler = (rating) => {

        props.selectedRating(rating);
        
        }

        functionHandler(rating)

    return (

        <div className="stars">
            {[...Array(5)].map((star, i) =>{
                const ratingValue = i + 1;

                return (
                
                <label>
                    <input type="radio" name="rating" 
                        value={ratingValue} 
                        onClick={ () => setRating(ratingValue) }/>

                    <FaStar className="star" size={25} color={ ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                        />

                </label> )
                    })}

            
        </div>
    )
}


export default StarRating;