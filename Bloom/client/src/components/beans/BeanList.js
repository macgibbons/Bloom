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

<div className="page--header">
            <div className="title--pair">
                <div className="page--title">Coffee</div>
            
                <div  onClick={() => {logInCheck()}} className="add--btn"><img className="add" src={require ('../../icons/addWhite.svg')}/>Add coffee</div>
            </div>
            <div className="header--filters">
                    <div>Roaster</div>
                    <select className="rounded"></select>
                    <div >Country</div>
                    <select className="rounded"></select>
                    <div>Process</div>
                    <select className="rounded"></select>
                    <div>Keywords</div>
                    <input className="rounded" ></input>
            </div>
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