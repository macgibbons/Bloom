import React, { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { BrewContext } from "../brews/BrewProvider";
import { getUser } from "../../API/userManager";
import { CommentContext } from "../comments/CommentProvider";
import Comment from "../comments/Comment";
import { FaRegUserCircle } from "react-icons/fa";
import StarRating from "../StarRating";
import StarRatingDisplay from "../StarRatingDisplay";
import { RatingContext } from "../UserRating/RatingProvider";
import { MdVerifiedUser } from "react-icons/md";
import { FollowContext } from "./follow/FollowProvider";

export default ({ brew,  props}) => {

    // ***** USER *****
    const user = getUser()

     // ***** CONTEXT *****
    const { comments, addComment } = useContext(CommentContext)
    const { deleteBrew, brews } = useContext(BrewContext)
    const { ratings, addRating } = useContext(RatingContext)
    const { follows, addFollow, deleteFollow } = useContext(FollowContext)

     // ***** STATE *****
    const [comment, setComment] = useState(null)
    const [ rating, setRating ] = useState(0)
    const [ averageRating, setAverageRating ] = useState(null)
    const [ ratingAmount, setRatingAmount ] = useState(0)
    const [ follow, setFollow ] = useState(false)


     // ***** DATA *****
    const brewComments = comments.filter(comment => comment.brewId === brew.id)
    var moment = require('moment')
    var timestamp = moment(brew.brewDate)
    var timePassed = timestamp.from(moment())
    const userRatings = ratings.filter(r => r.userId === user.id && r.brewId === brew.id)
    const userFollows = follows.filter(f => f.userId === user.id)
    const checkFollow = userFollows.find(f => f.folllowId === brew.userId)
    
    useEffect(()=> {
        if(checkFollow !== undefined){
            setFollow(true)
        }
    })
    
     // ***** API *****
    const deleteConfirm = () => {

     if(window.confirm(`Are you sure you want to delete this brew? This action cannot be undone`))
       {deleteBrew(brew.id)
       }}

    const constructNewComment = () => {

       if(comment === ''){

       } else {
           addComment({
              
               text: comment,
               brewId: brew.id,
               datePosted: moment().format(),
               userId: user.id,
               edited: false
           }).then(setComment(null))
       }
    }

    
    const constructNewRating = () => {
         
            addRating({
               
                rating: rating,
                brewId: brew.id,
                userId: user.id,
                
            })
        
    }

    const followButton = (
        <>
            <div className="follow--btn"
            onClick={() => {
                if(window.confirm(`Are you sure you want to follow this user?`)){

                    addFollow({
                        folllowId: brew.userId, 
                        userId: user.id
                    }).then(()=>{setFollow(true)})
                }
                
                }}>
                follow
            </div>
        </>
    ) 

    const unFollowButton = (
        <>
            <div className="unfollow--btn"
            onClick={() => {
                if(window.confirm(`Are you sure you want to unfollow this user?`)){
                deleteFollow(checkFollow.id).then(()=>{setFollow(false)})
                }
                }}>
                
                <div className="center">following</div>
                <img className="carrot" size={1}src={require ('../../icons/down.svg')} alt="down icon"/>
            </div>
        </>
    ) 
    const brewRatings = ratings.filter(r => r.brewId === brew.id)
    
    const findAverage = () =>
    {
        let ratings = 0
        let length = brewRatings.length
        brewRatings.forEach(r => {
            ratings += r.rating
           let average = ratings / length
            setAverageRating(average.toFixed(1))
            setRatingAmount(length)
        });
    }

    useEffect(()=>{

        findAverage()
    })
     // ***** COMPONENT *****
return (
    <section className="explore--card">
        <div className="">
            <div className="EC--header">
            <div className="EC--UserHeader">
                {/* <FaRegUserCircle className="gradient" size={20}/> */}
                <div className="EC--User">
                <div> 
                     <Link  className="archivo card--link" to={`/profile/${brew.userId}`}>
                        {brew.user.firstName} {brew.user.lastName}<span>{brew.user.lastName.toLowerCase() === "coffee" ? <MdVerifiedUser size={15} /> : "" }</span>
                    </Link>
                    </div>
                    <div className="card--control">{brew.userId === user.id ? "" : follow ? unFollowButton : followButton }</div>
        
               

                </div>
                </div>
                <div className="EC--rating">
                    {   
                        brew.userId === user.id ? 
                        <>
                        <div className="EC--ratingDisplay">
                            <div>{averageRating}  ({ratingAmount})</div>
                            <StarRatingDisplay displayRating={averageRating} />
                        </div>
                        </>
                        :
                        userRatings.length === 0 ?
                        <>
                        <div className="EC--ratingDisplay">

                            <div>{ratingAmount === 0 ? `be the first to review` : `${averageRating}  (${ratingAmount})`}</div>
                        <div className="EC--ratingForm">
                            <StarRating className="rating--form" {...props} 
                                selectedRating={setRating} 
                                />
                            
        
                            <img    className="EC--arrow" src={require ("../../icons/right.svg")} onClick={evt => {
                                evt.preventDefault()
                                constructNewRating()}} />
                        </div>
                        </div>
                        </> : 
                        <>
                        <div className="EC--ratingDisplay">
                            <div>{averageRating}  ({ratingAmount})</div>
                            <StarRatingDisplay displayRating={averageRating} />
                        </div>
                        </>
                    }
                </div>
                
            </div>

            <div className="EC--content">
                    <div className="EC--notes">{brew.notes}</div>
                    <div className="EC--recipie">

                        <div className="detail--pairs">

                            <div className="detail--title">{ brew.bean.beanName }</div>
                            <div className="">{ brew.bean.roaster }</div>
                        
                        </div>
                        <div>
                            <Link  className="card--link" to={`/brews/${brew.id}`}>
                                { brew.brewMethod.method }
                            </Link>
                        </div>


                        <div className="detail--pairs">
                            <div>{ brew.coffeeDose }g</div>
                            <div>{ brew.waterDose }g</div>
                            <div>{ moment.utc(brew.brewTime * 1000).format('m:ss') }</div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="EC--subheader">{ timePassed }</div>
                        <div className="EC--controls">
                        {
                            user.id === brew.userId ?
                            <>
                            {/* <div className="card--control"
                            onClick={() => {
                                push(`/brews/edit/${brew.id}`)
                            }} >edit</div> · */}
                        <div className="card--control"
                            onClick={()=>{ deleteConfirm() }
                        }>delete post</div>
                        </>:
                        <>
                        <div></div>
                        </>
                        }
                        
                    </div>
                    </div>
            </div>

            <section className="comment--section">
                <div className="comment--pair">
                    <input className="comment--input" type='text' placeholder="comment..." onChange={evt => setComment(evt.target.value)} onKeyDown={evt => {
                            
                            evt.keyCode === 13 ? constructNewComment() : console.log(evt.keyCode)}}/>
                    
                    <button type="submt" className="submit--btn" onClick={evt => {
                            evt.preventDefault()
                            constructNewComment()}}>submit</button>
                </div>
            <div className="comment--container">
                { brewComments.length > 0 ? 
                    brewComments.map(comment => {

                        return <Comment key={comment.id} comment={comment} />})
                    :
                    "be the first to comment"
                }
            </div>
            </section>
                
        </div>


    </section>
)


}