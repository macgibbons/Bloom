import React, { useContext, useState, useEffect } from "react"
import { Link, Route } from "react-router-dom"
import { CommentContext } from "./CommentProvider"
import './Comments.css'
import { FaRegUserCircle } from "react-icons/fa"
import { getUser } from "../../API/userManager"


export default ({ comment }) => {
     // ***** USER *****
    const user = getUser()
    
     // ***** CONTEXT *****
    const { deleteComment, updateComment } = useContext(CommentContext)

     // ***** STATE *****
     const [updatedComment, setUpdatedComment ] = useState(comment.text)
     const [form, setForm ] = useState(false)


     // ***** DATA *****
    var moment = require('moment')
    var timestamp = moment(comment.datePosted)
    var timePassed = timestamp.from(moment())
  
     // ***** API *****
    const deleteConfirm = () => {
    if(window.confirm(`Are you sure you want to delete this comment`))
        {deleteComment (comment.id)
        }}
    const editComment = () => {
        
        updateComment({
            id: comment.id,
            text: updatedComment,
            userId: user.id,
            datePosted: moment().format(),
            brewId: comment.brewId
        }).then(()=>{setForm(false)})
    }

    // ***** COMPONENT *****
    return(

    <section className="comment" onClick={ form ? ()=>setForm(false) : "" }>
        {
            form ?
            <>
            <input className="comment--input" type='text' defaultValue={comment.text}  onChange={evt => setUpdatedComment(evt.target.value)} /> 
            <button className="submit--btn" type="submit" onClick={evt => {evt.preventDefault(); editComment()}}>submit</button>
            </> :
            <>
                <div className="comment--content">
                    <FaRegUserCircle size={20}/>
                    <div className="comment--text">
                    
                        <div className="comment--user">{user.id === comment.userId ? "" : comment.user.firstName + ": " }</div>
                        <div>{comment.text}</div>
                    </div>
                </div>

                <div className="comment--footer">
                    <div className="comment--controls">
                        {
                            user.id === comment.userId ? 
                            <>
                                <div className="comment--control"
                                    onClick={()=>setForm(true)}>edit</div>
                                <div>·</div>
                                <div className="comment--control"
                                    onClick={()=>deleteConfirm()}>delete</div>
                            </>
                                : 
                                
                                <div></div>
                        }
                    <div className={user.id === comment.userId ? "userComment--date":"comment--date"} >{timePassed}</div>
                    </div>

                </div>

            </>
        }



        
    </section>
)

  }
