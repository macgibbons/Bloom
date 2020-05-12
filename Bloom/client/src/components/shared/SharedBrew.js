import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import moment from 'moment';
import { BrewContext } from "../brews/BrewProvider";
import { getUser } from "../../API/userManager";
import { CommentContext } from "../comments/CommentProvider";
import { BeanContext } from "../beans/BeanProvider";
import Comment from "../comments/Comment";

export default ({ brew, history}) => {
    const user = getUser()

    const { comments, addComment } = useContext(CommentContext)
    const { deleteBrew, brews } = useContext(BrewContext)
  
    const [comment, setComment] = useState(null)

    const brewComments = comments.filter(comment => comment.brewId === brew.id)
    console.log(brewComments)
    const deleteConfirm = () => {
     if(window.confirm(`Are you sure you want to delete this brew? This action cannot be undone`))
       {deleteBrew(brew.id)
       }}

       const constructNewComment = () => {
        debugger

        
                addComment({
                   
                    text: comment,
                    brewId: brew.id,
                    datePosted: moment().format(),
                    userId: user.id
                })
                   
            
        
        
    }

return (
    <section className="">
        <div className="coffee--card">
            
            <div>
                {/* <h1>{ brew.brewMethod.method }</h1> */}
                <Link  className="card--link" to={`/brews/${brew.id}`}>
                    { brew.brewMethod.method }
                </Link>
                <div>{ moment(brew.brewDate).format('MM | DD | YY') }</div>
            </div>

            <div>
                <div>{ brew.bean.beanName }</div>
                <div>{ brew.bean.roaster }</div>
               
            </div>


            <div>
                <div>{ brew.coffeeDose }g</div>
                <div>{ brew.waterDose }g</div>
                <div>{ moment.utc(brew.brewTime * 1000).format('m:ss') }</div>
            </div>
            <div>
                { brewComments.length > 0 ? 
                    brewComments.map(comment => {

                        return <Comment key={comment.id} comment={comment} />})
                    :
                    "be the first to comment"
                }
            </div>
            <input className="comment--input" type='text' placeholder="comment..." onChange={evt => setComment(evt.target.value)}/>
            
            <button className="submit-btn" onClick={evt => {
                    evt.preventDefault()
                    constructNewComment()}}>submit</button>
            <div className="card--controls">
                {
                    user.id === brew.userId ?
                    <>
                <div className="card--control"
                    onClick={()=>{ deleteConfirm() }
                }>delete</div>
                <div className="card--control"
                   onClick={() => {
                       history.push(`/brews/edit/${brew.id}`)
                    }} >edit</div> 
                </>:
                <>
                <div>comment:</div>
                </>
                }
                
            </div>
                <div>posted by: {brew.user.firstName} {brew.user.lastName}</div>
        </div>


    </section>
)


}