import React, { useContext } from "react"
import "./Beans.css"
import { BeanContext } from "./BeanProvider";
import Bean from "./Bean";
import { getUser } from "../../API/userManager";
import { RegionContext } from "../regions/RegionProvider"

export default (props) => {
    // ***** CONTEXT *****
    const { beans } = useContext(BeanContext)
    const { regions } = useContext(RegionContext)

    // ***** USER *****
   const user = getUser()
    const currentUserBeans = beans.filter(b => b.userId === user.id)
    

    let userRoasters = []

    currentUserBeans.forEach(b => {
       if( userRoasters.find(r => b.roaster === r)){

       }else {

           userRoasters.push(b.roaster)
       }
        
    }); 

    let userProcess = []

    currentUserBeans.forEach(b => {
       if( userProcess.find(r => b.process.toLowerCase() === r.toLowerCase())){

       } else {

           userProcess.push(b.process)
       }
        
    }); 

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
                    <select className="rounded">
                        <option value={0}>All</option>
                            {
                                userRoasters.map( b => <option value={b} > {b}</option>)
                            }
                    </select>
                    <div >Region</div>
                    <select className="rounded">
                    <option value={0}>All</option>
                            {
                                regions.map( r => <option value={r.id} > {r.regionName}</option>)
                            }
                    </select>
                    <div>Process</div>
                    <select className="rounded">
                        <option value={0}>All</option>
                            {
                                userProcess.map( b => <option value={b} > {b}</option>)
                            }
                    </select>
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