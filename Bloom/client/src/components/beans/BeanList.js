import React, { useContext, useState, useEffect } from "react"
import "./Beans.css"
import { BeanContext } from "./BeanProvider";
import Bean from "./Bean";
import { getUser } from "../../API/userManager";
import { RegionContext } from "../regions/RegionProvider"
import EmptyState from "../EmptyState";

export default (props) => {
    // ***** CONTEXT *****
    const { beans } = useContext(BeanContext)
    const { regions } = useContext(RegionContext)

    // ***** USER *****
   const user = getUser()
    const currentUserBeans = beans.filter(b => b.userId === user.id)
    
    // ***** STATE *****
    const [roaster, setRoaster] = useState("")
    const [region, setRegion] = useState(0)
    const [process, setProcess] = useState("")

    const beansByRegion = currentUserBeans.filter(b => b.regionId === parseInt(region))



    // ***** ROASTER *****

    let userRoasters = []

    currentUserBeans.forEach(b => {
       if( userRoasters.find(r => b.roaster === r)){

       }else {

           userRoasters.push(b.roaster)
       }
        
    }); 

    const beansByRoaster = currentUserBeans.filter(b => b.roaster.toLowerCase() === roaster.toLowerCase())



    // ***** PROCESS *****

    let userProcess = []

    currentUserBeans.forEach(b => {
       if( userProcess.find(r => b.process.toLowerCase() === r.toLowerCase())){

       } else {

           userProcess.push(b.process)
       }
        
    }); 

    const beansByProcess = currentUserBeans.filter(b => b.process.toLowerCase() === process.toLowerCase())

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
   
    useEffect(()=>{
        console.log(parseInt(region))
    })
    return (
        <div className="coffee--view">

<div className="page--header">
            <div className="title--pair">
                <div className="page--title">Coffee</div>
            
                <div  onClick={() => {logInCheck()}} className="add--btn"><img className="add" src={require ('../../icons/addWhite.svg')}/>Add coffee</div>
            </div>
            <div className="header--filters">
                    <div>Roaster</div>
                    <select onChange={(evt)=>{setRoaster(evt.target.value)}} className="rounded">
                        <option value={""}>All</option>
                            {
                                userRoasters.map( b => <option value={b} > {b}</option>)
                            }
                    </select>

                    <div >Region</div>
                    <select onChange={(evt)=>{setRegion(evt.target.value)}} className="rounded">
                    <option value={0}>All</option>
                            {
                                regions.map( r => <option value={r.id} > {r.regionName}</option>)
                            }
                    </select>

                    <div>Process</div>
                    <select onChange={(evt)=>{setProcess(evt.target.value)}} className="rounded">
                        <option value={0}>All</option>
                            {
                                userProcess.map( b => <option value={b} > {b}</option>)
                            }
                    </select>
                    <div>Keywords</div>
                    <input placeHolder="juicy, floral, etc" className="rounded" ></input>
            </div>
</div>
            <div className="coffee--container">

            {   process === "" ?

                    region != 0 ? 
                 
                        beansByRegion.length === 0 ? 
                        
                        <EmptyState /> 
                        :
                        beansByRegion.map(bean => {
                            return <Bean key={bean.id} bean={bean} {...props} />}) 
                        : 

                    roaster === "" ? 

                        currentUserBeans.map(bean => {
                            return <Bean key={bean.id} bean={bean} {...props} />}) 
                        : 
                        beansByRoaster.map(bean => {
                            return <Bean key={bean.id} bean={bean} {...props} />}) 
                        :

                    beansByProcess.length > 0 ?

                        beansByProcess.map(bean => {
                            return <Bean key={bean.id} bean={bean} {...props} />}) 
                        :   
                        currentUserBeans.map(bean => {
                            return <Bean key={bean.id} bean={bean} {...props} />})           
            }
            
            <a  className="coffee--card add--bean"
                        onClick={() => {logInCheck()}}>
                <img className="add--icon" src={require ("../../icons/add.svg")}/>
                </a>
            </div>
        </div>
    )
}