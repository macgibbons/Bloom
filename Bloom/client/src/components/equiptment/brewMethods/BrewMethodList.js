import React, { useContext } from "react"
import "./BrewMethods.css"
import BrewMethod from "./BrewMethod";
import { BrewMethodContext } from "./BrewMethodProvider";


export default (props) => {
    // ***** CONTEXT *****
    const { brewMethods } = useContext(BrewMethodContext)

   
    return (
        <div className="coffee--view">
            <div className="method--card">
                <div className="container--title">What are you brewing today?</div>
            
                <div className="method--container">
                {
                    brewMethods.map(brewMethod => {

                        return <BrewMethod key={brewMethod.id} brewMethod={brewMethod} {...props}  />
                    })                
                }
                </div>

            </div>
            {/* <div className="flex--row">

                <a  className="coffee--card add--bean"
                       >
                        
                        <img className="add--icon" src={require ("../../../icons/add.svg")}/>
                    </a>
                <a  className="coffee--card add--bean"
                       >

                        <img className="add--icon" src={require ("../../../icons/add.svg")}/>
                    </a>
            </div> */}
        </div>
    )
}