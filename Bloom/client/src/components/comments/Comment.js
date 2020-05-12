import React, { useContext, useState, useEffect } from "react"
import { Link, Route } from "react-router-dom"
import { CommentContext } from "./CommentProvider"
import './Comments.css'


export default ({ comment }) => {
  const { deleteComment } = useContext(CommentContext)
  var moment = require('moment')


  const deleteConfirm = () => {
   if(window.confirm(`Are you sure you want to delete this comment`))
     {deleteComment (comment.id)
     }}

     return(
    <section className="comment">

        <div className="">

        <div className="comment--date">posted: { moment(comment.datePosted).format('MM | DD | YY') }</div>
        <div>{comment.text}</div>
        </div>


        
    </section>
)

  }
