import React, { useState, useEffect } from "react"


export const CommentContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])

    const getComments = () => {
        return fetch("https://localhost:5001/api/comments")
            .then(res => res.json())
            .then(setComments)
    }

    const addComment = comment => { 
      
        return fetch("https://localhost:5001/api/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
            .then(getComments)
    }

    const updateComment = comment => {
        debugger
        return fetch(`https://localhost:5001/api/comments/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
            .then(getComments)
    }

    const deleteComment = commentId => {
        return fetch(`https://localhost:5001/api/comments/${commentId}`, {
            method: "DELETE"
        })
            .then(getComments)
    }

    /*
        Load all comments when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */

    useEffect(() => {
        getComments()
    }, [])

    useEffect(() => {
        console.log("****  Comment APPLICATION STATE CHANGED  ****")
    }, [comments])

    return (
        <CommentContext.Provider value={{
            comments, addComment, deleteComment, updateComment
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}
