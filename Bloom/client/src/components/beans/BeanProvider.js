import React, { useState, useEffect } from "react"


export const BeanContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const BeanProvider = (props) => {
    const [beans, setBeans] = useState([])

    const getBeans = () => {
        return fetch("https://localhost:5001/api/beans")
            .then(res => res.json())
            .then(setBeans)
    }

    const addBean = bean => { 
        return fetch("https://localhost:5001/api/beans", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bean)
        })
            .then(getBeans)
    }

    const updateBean = bean => {
        return fetch(`https://localhost:5001/api/beans/${bean.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bean)
        })
            .then(getBeans)
    }

    const deleteBean = beanId => {
        return fetch(`https://localhost:5001/api/beans/${beanId}`, {
            method: "DELETE"
        })
            .then(getBeans)
    }

    /*
        Load all Beans when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */

    useEffect(() => {
        getBeans()
    }, [])

    useEffect(() => {
        console.log("****  BEAN APPLICATION STATE CHANGED  ****")
    }, [beans])

    return (
        <BeanContext.Provider value={{
            beans, addBean, deleteBean, updateBean
        }}>
            {props.children}
        </BeanContext.Provider>
    )
}
