import React, { useState, useEffect } from "react"


export const RatingContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const RatingProvider = (props) => {
    const [ratings, setRatings] = useState([])

    const getRatings = () => {
        return fetch("https://localhost:5001/api/UserRatings")
            .then(res => res.json())
            .then(setRatings)
    }
    const addRating = rating => { 
        return fetch("https://localhost:5001/api/UserRatings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rating)
        })
            .then(getRatings)
    }

    const updateRating = rating => {
        return fetch(`https://localhost:5001/api/UserRatings/${rating.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rating)
        })
            .then(getRatings)
    }

    const deleteRating = ratingId => {
        return fetch(`https://localhost:5001/api/UserRatings/${ratingId}`, {
            method: "DELETE"
        })
            .then(getRatings)
    }

    /*
        Load all Ratings when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */

    useEffect(() => {
        getRatings()
    }, [])

    useEffect(() => {
        console.log("****  BEAN APPLICATION STATE CHANGED  ****")
    }, [ratings])

    return (
        <RatingContext.Provider value={{
            ratings, addRating, deleteRating, updateRating
        }}>
            {props.children}
        </RatingContext.Provider>
    )
}
