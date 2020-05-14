import React, { useContext } from "react"
import "./Beans.css"
import { BeanContext } from "./BeanProvider";
import Bean from "./Bean";
import { getUser } from "../../API/userManager";


export default (props) => {
    // ***** CONTEXT *****
    const { beans } = useContext(BeanContext)
 

    // ***** USER *****
   const user = getUser()
    const currentUserBeans = beans.filter(b => b.userId === user.id)
    

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

            <div className="title--pair">
                <div className="page--title">Coffee</div>
            
                
            </div>

            <div className="coffee--container">

            {
                currentUserBeans.map(bean => {

                    return <Bean key={bean.id} bean={bean} {...props} />
                })                
            }
            
            <a  className="coffee--card add--bean"
                        onClick={() => {logInCheck()}}>
                <img className="add--icon" src={require ("../../icons/add.svg")}/>
                </a>
            </div>
        </div>
    )
}