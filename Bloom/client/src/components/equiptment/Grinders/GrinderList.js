import React, { useContext } from "react"
import "./Grinders.css"
import Grinder from "./Grinder";
import { GrinderContext } from "./GrinderProvider";
import { getUser } from "../../../API/userManager";
import BrewMethodList from "../brewMethods/BrewMethodList";


export default (props) => {
    // ***** CONTEXT *****
    const { grinders } = useContext(GrinderContext)
 

    // ***** USER *****
   const user = getUser()
    const currentUserGrinders = grinders.filter(g => g.userId === user.id)

    if(user !== null) {
        document.body.classList.add("user--loggedIn")
    }
   
    return (
        <div className="coffee--view">
            <div className="">My Gear</div>
          
          <BrewMethodList /> 
          
            <div className="coffee--container">

            {
                currentUserGrinders.map(grinder => {

                    return <Grinder key={grinder.id} grinder={grinder}  />
                })                
            }
            
            </div>
        </div>
    )
}