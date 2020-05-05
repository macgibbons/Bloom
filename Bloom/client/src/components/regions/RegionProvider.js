import React, { useState, useEffect } from "react"


export const RegionContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const RegionProvider = (props) => {
    const [regions, setRegions] = useState([])

    const getRegions = () => {
        return fetch("https://localhost:5001/api/Regions")
            .then(res => res.json())
            .then(setRegions)
    }


    /*
        Load all Regions when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */

    useEffect(() => {
        getRegions()
    }, [])

    useEffect(() => {
        console.log("****  REGION APPLICATION STATE CHANGED  ****")
    }, [regions])

    return (
        <RegionContext.Provider value={{
            regions
        }}>
            {props.children}
        </RegionContext.Provider>
    )
}
