import React, { useContext } from "react"
import "./BrewMethods.css"
import BrewMethod from "./BrewMethod";
import { BrewMethodContext } from "./BrewMethodProvider";


export default (props) => {
    // ***** CONTEXT *****
    const { brewMethods } = useContext(BrewMethodContext)

  
   
    return (
        <div className="coffee--view">
          
            <div className="coffee--container">

            {
                brewMethods.map(brewMethod => {

                    return <BrewMethod key={brewMethod.id} brewMethod={brewMethod}  />
                })                
            }
            
            </div>
        </div>
    )
}