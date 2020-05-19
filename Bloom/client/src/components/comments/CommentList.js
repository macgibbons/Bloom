import React, { useContext } from "react"
import "./Beans.css"
import { BeanContext } from "./BeanProvider";
import Bean from "./Bean";
import { getUser } from "../../API/userManager";
import { CommentContext } from "./CommentProvider";
import { BrewContext } from "../brews/BrewProvider";


export default (props) => {
    // ***** CONTEXT *****
    const { comments } = useContext(CommentContext)
    const { beans } = useContext(BeanContext)
    const { brews } = useContext(BrewContext)
 

    // ***** USER *****
   const user = getUser()

    const currentBrewComments = comments.filter(comment => comment.brewId === brew.id)
    

    if(user !== null) {
        document.body.classList.add("user--loggedIn")
    }

    const logInCheck = () => {
        if(user === ""){
            window.alert("please log in")
        } else {
            
            updateApplicationView()
        
        }
    }

    const updateApplicationView = () => {
        props.history.push("/coffee/create")
    }
   
    return (
        <div className="coffee--view">
            <div className="">My Coffee</div>
          
            <a className="btn add--btn"
                    onClick={() => {logInCheck()}}>
            add coffee
            </a>
            <div className="coffee--container">

            {
                currentUserBeans.map(bean => {

                    return <Bean key={bean.id} bean={bean} {...props} />
                })                
            }
            
            </div>
        </div>
    )
}