import React, { useState, useEffect } from "react"

export const FollowContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const FollowProvider = (props) => {
    const [follows, setFollows] = useState([])

    const getFollows = () => {
        return fetch("https://localhost:5001/api/follows")
            .then(res => res.json())
            .then(setFollows)
    }

    const addFollow = follow => { 
        return fetch("https://localhost:5001/api/follows", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(follow)
        })
            .then(getFollows)
    }


    const deleteFollow = followId => {
        return fetch(`https://localhost:5001/api/follows/${followId}`, {
            method: "DELETE"
        })
            .then(getFollows)
    }

    /*
        Load all follows when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */

    useEffect(() => {
        getFollows()
    }, [])

    useEffect(() => {
        console.log("****  FOLLOW APPLICATION STATE CHANGED  ****")
    }, [follows])

    return (
        <FollowContext.Provider value={{
            follows, addFollow, deleteFollow
        }}>
            {props.children}
        </FollowContext.Provider>
    )
}
