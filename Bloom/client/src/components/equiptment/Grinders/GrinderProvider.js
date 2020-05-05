import React, { useState, useEffect } from "react"


export const GrinderContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const GrinderProvider = (props) => {
    const [grinders, setGrinders] = useState([])

    const getGrinders = () => {
        return fetch("https://localhost:5001/api/grinders")
            .then(res => res.json())
            .then(setGrinders)
    }

    const addGrinder = grinder => { 
        return fetch("https://localhost:5001/api/grinders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(grinder)
        })
            .then(getGrinders)
    }

    const updateGrinder = grinder => {
        return fetch(`http://localhost:8088/grinders/${grinder.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(grinder)
        })
            .then(getGrinders)
    }

    const deleteGrinder = grinderId => {
        return fetch(`http://localhost:8088/grinders/${grinderId}`, {
            method: "DELETE"
        })
            .then(getGrinders)
    }

    /*
        Load all grinders when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */

    useEffect(() => {
        getGrinders()
    }, [])

    useEffect(() => {
        console.log("****  GRINDER APPLICATION STATE CHANGED  ****")
    }, [grinders])

    return (
        <GrinderContext.Provider value={{
            grinders, addGrinder, deleteGrinder, updateGrinder
        }}>
            {props.children}
        </GrinderContext.Provider>
    )
}
