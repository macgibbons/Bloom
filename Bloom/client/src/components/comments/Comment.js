import React, { useContext, useState, useEffect } from "react"
import { Link, Route } from "react-router-dom"
import { CommentContext } from "./CommentProvider"
import './Comments.css'
import { FaRegUserCircle } from "react-icons/fa"


export default ({ comment }) => {
  const { deleteComment } = useContext(CommentContext)
  var moment = require('moment')
  var timestamp = moment(comment.datePosted)
  var timePassed = timestamp.from(moment())
console.log(moment().from(timestamp))
  const deleteConfirm = () => {
   if(window.confirm(`Are you sure you want to delete this comment`))
     {deleteComment (comment.id)
     }}

     return(
    <section className="comment">

        <div className="comment--content">
            <FaRegUserCircle size={20}/>
            <div className="comment--text">
                <div className="comment--user">{comment.user.firstName} {comment.user.lastName}</div>
                <div>{comment.text}</div>
            </div>
        </div>

        <div className="comment--date">{timePassed}</div>


        
    </section>
)

  }
