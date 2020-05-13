import React, { useState, useEffect } from "react"


export const UserContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const UserProvider = (props) => {
    const [users, setUsers] = useState([])

    const getUsers = () => {
        return fetch("https://localhost:5001/api/users")
            .then(res => res.json())
            .then(setUsers)
    }
   

    useEffect(() => {
        getUsers()
    }, [])


    useEffect(() => {
        console.log("****  USER APPLICATION STATE CHANGED  ****")
    }, [users])

    return (
        <UserContext.Provider value={{
            users
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
