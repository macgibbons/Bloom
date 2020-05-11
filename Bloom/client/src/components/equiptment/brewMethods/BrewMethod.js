import React from "react"
import { Link } from "react-router-dom"
import "./BrewMethods.css"


export default ({brewMethod, history}) => {

    const updateApplicationView = () => {
        history.push("/brews/create")
    }
   
    return (
    <section className="">

        <div className="brewMethod" 
        onClick={()=> {
            updateApplicationView()
        }}>
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

