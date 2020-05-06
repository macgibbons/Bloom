import React, { useState, useEffect } from "react"


export const BrewContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const BrewProvider = (props) => {
    const [brews, setBrews] = useState([])

    const getBrews = () => {
        return fetch("https://localhost:5001/api/brews")
            .then(res => res.json())
            .then(setBrews)
    }

    const addBrew = brew => { 
        return fetch("https://localhost:5001/api/brews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(brew)
        })
            .then(getBrews)
    }

    const updateBrew = brew => {
        return fetch(`https://localhost:5001/api/brews/${brew.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(brew)
        })
            .then(getBrews)
    }

    const deleteBrew = brewId => {
        return fetch(`https://localhost:5001/api/brews/${brewId}`, {
            method: "DELETE"
        })
            .then(getBrews)
    }

    /*
        Load all brews when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */

    useEffect(() => {
        getBrews()
    }, [])

    useEffect(() => {
        console.log("****  BREW APPLICATION STATE CHANGED  ****")
    }, [brews])

    return (
        <BrewContext.Provider value={{
            brews, addBrew, deleteBrew, updateBrew
        }}>
            {props.children}
        </BrewContext.Provider>
    )
}
