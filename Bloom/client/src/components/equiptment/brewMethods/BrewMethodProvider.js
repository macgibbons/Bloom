import React, { useState, useEffect } from "react"


export const BrewMethodContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const BrewMethodProvider = (props) => {
    const [brewMethods, setBrewMethods] = useState([])

    const getBrewMethods = () => {
        return fetch("https://localhost:5001/api/brewMethods")
            .then(res => res.json())
            .then(setBrewMethods)
    }


    /*
        Load all brewMethods when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */

    useEffect(() => {
        getBrewMethods()
    }, [])

    useEffect(() => {
        console.log("****  GRINDER APPLICATION STATE CHANGED  ****")
    }, [brewMethods])

    return (
        <BrewMethodContext.Provider value={{
            brewMethods
        }}>
            {props.children}
        </BrewMethodContext.Provider>
    )
}
