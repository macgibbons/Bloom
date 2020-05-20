import React, { useContext, useState, useEffect } from "react"
import { getUser } from "../../API/userManager";
import { UserContext } from "../../API/UserProvider";
import { BeanContext } from "../beans/BeanProvider";
import { BrewContext } from "../brews/BrewProvider";
import SharedBrew from "./SharedBrew";
import Bean from "../beans/Bean";
import { FaRegUserCircle } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { FollowContext } from "./follow/FollowProvider";


export default (props) => {


    // ***** CONTEXT *****
    const { beans } = useContext(BeanContext)
    const { users } = useContext(UserContext)
    const { brews } = useContext(BrewContext)
    const { follows, addFollow, deleteFollow } = useContext(FollowContext)

    // ***** STATE *****
    const [view, setView] = useState("brews")
    const [follow, setFollow] = useState(false)

    // ***** USER *****
   const currentUser = getUser()
   const chosenUserId = props.match.params.userId
   const user = users.find(user => user.id === chosenUserId) || {}
   const userBeans = beans.filter(bean => bean.userId === chosenUserId)
   const userBrews = brews.filter(brew => brew.userId === user.id)
   const userSharedBrews = userBrews.filter(brew => brew.shared === true)
   const userFollows = follows.filter(f => f.userId === user.id)
   const followsUser = follows.filter(f => f.folllowId === user.id)
   const checkFollow = followsUser.find(f => f.userId === currentUser.id) 
    console.log(checkFollow)

    // ***** COMPONENT *****

    useEffect(()=> {
        if(checkFollow !== undefined){
            setFollow(true)
        }
    }) 
    const followButton = (
        <>
            <div className="follow--btn"
            onClick={() => {
                if(window.confirm(`Are you sure you want to follow this user?`)){

                    addFollow({
                        folllowId: user.id, 
                        userId: currentUser.id
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
   
    return (
        <div className="explore--view">

            <div className="profile--sidebar explore--filters">

                <button  className="profile--filter" onClick={()=>setView("brews")}>
                    brews
                </button>
                <button className="profile--filter" onClick={()=>setView("coffee")}>
                    coffee
                </button>
                <div className="row user--posts">
                    <div className="user--post">
                        <div>{userSharedBrews.length}</div>
                        <div>posts</div>
                    </div>
                    <div className="user--post">
                        <div>{followsUser.length}</div>
                        <div>followers</div>
                    </div>
                    <div className="user--post">
                        <div>{userFollows.length}</div>
                        <div>following</div>
                    </div>
                </div>
                <div className=" profile--username">
                    {user.firstName} {user.lastName} <span>{ user.lastName === "Coffee"  ? <MdVerifiedUser className="gradient"size={20} /> : "" }</span>
                </div>
                <div className="">
                    <FaRegUserCircle color='#5E51E1' className="gradient" size={100}/>
                    <div>{currentUser.id === user.id ? "" : follow ? unFollowButton : followButton }</div>
                </div>
                
            </div>

            <div className="explore--container">

                {
                    view === "coffee" ?
                    <div className="center">
                        {
                            userBeans.map(bean => {
                                return <Bean className="user--bean" key={bean.id} bean={bean} {...props} />
                            })
                        }
                    </div> : 
                    <div>
                        {
                            userSharedBrews.map(brew => {
                                return <SharedBrew key={brew.id} brew={brew} {...props} />
                            })
                        }
                    </div>
                }

            </div>

        </div>
    )
}