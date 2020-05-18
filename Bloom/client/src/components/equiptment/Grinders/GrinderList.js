import React, { useContext, useState } from "react"
import "./Grinders.css"
import Grinder from "./Grinder";
import { GrinderContext } from "./GrinderProvider";
import { getUser } from "../../../API/userManager";
import BrewMethodList from "../brewMethods/BrewMethodList";
import GrinderForm from "./GrinderForm";
import { Route } from "react-router-dom";


export default (props) => {
    // ***** CONTEXT *****
    const { grinders } = useContext(GrinderContext)

    const [form, setForm] = useState(false)
 

    // ***** USER *****
   const user = getUser()
    const currentUserGrinders = grinders.filter(g => g.userId === user.id)

    if(user !== null) {
        document.body.classList.add("user--loggedIn")
    }
   
    const logInCheck = () => {
        if(user === ""){
            window.alert("please log in")
        } else {
            console.log("user is logged in");
            
            setForm(true)
            
        
        }
    }
    const updateApplicationView = () => {
        props.history.push("/Grinders/create")
    }
    return (
        <div className="coffee--view">

<div className="page--header">
                <div className="title--pair">
                    <div className="page--title">My Gear</div>
                    
               
            
                <div  onClick={() => {logInCheck()}} className="add--btn"><img className="add" src={require ('../../../icons/addWhite.svg')}/>Add grinder</div>
           

                    
                </div>

            <div className="header--filters">
                    <div>All equipment</div>
                    <div>Brew methods</div>
                    <div>Brew methods</div>
                    <div>Grinders</div>
                    <div>Kettles</div>
                    <div>Scales</div>
                   
            </div>
            
            
            </div>

           
            
                <div>
                    { form ? 

                    <>
                        <div className="coffee--card add--grinder">
                            <div className="center">
                            
                                <Route render= {props => <GrinderForm isFormShowing={setForm} {...props} />} /> 
                                <div className="card--control" onClick={ ()=> { setForm(false) } }>Hide</div>
                            </div>
                        </div>
                    </> 
                    : 
                    <div>

                        {/* <a  className="coffee--card add--grinder"
                                    onClick={() => {logInCheck()}}>
                            <img className="add--icon" src={require ("../../../icons/add.svg")}/>
                        </a> */}
                    </div> 
                    }
                </div>
            <div className="coffee--container">
             {
                currentUserGrinders.map(grinder => {
                    return <Grinder key={grinder.id} grinder={grinder}  />})                
             }


            </div>
        </div>
    )
}