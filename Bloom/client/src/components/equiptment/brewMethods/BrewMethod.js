import React from "react"
import { Link } from "react-router-dom"
import "./BrewMethods.css"


export default ({brewMethod, history}) => {

    const updateApplicationView = () => {
        
        history.push(`/brews/quick/${brewMethod.id}`)
    }
   
    return (
    <section className="">
        <div className="brewMethod" 
        onClick={()=> {
            updateApplicationView()
        }} brewMethod={brewMethod.id}>
            {
                brewMethod.imagePath ? <img src={require (`../../../images/${brewMethod.imagePath}`)} className="method-image"/> :
                 <>
                 <div className="other--method">
                    <div className="other">{brewMethod.method}</div>
                    <img src={require ("../../../icons/right.svg")}/>

                 </div>
                 </>
            }
            
        </div>


        
    </section>
)
        }

