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
    console.log(user.id);
    

    if(user !== null) {
        document.body.classList.add("user--loggedIn")
    }

    const logInCheck = () => {
        if(user === ""){
            window.alert("please log in")
        } else {
            console.log("user is logged in");
            
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

                    return <Bean key={bean.id} bean={bean}  />
                })                
            }
            
            </div>
        </div>
    )
}