import React, { useContext, useEffect, useRef } from "react"
import "./BrewMethods.css"
import BrewMethod from "./BrewMethod";
import { BrewMethodContext } from "./BrewMethodProvider";
import gsap, { Power3 } from "gsap";


export default (props) => {
    // ***** CONTEXT *****
    const { brewMethods } = useContext(BrewMethodContext)
   
    let line1 = useRef(null);
    let line2 = useRef(null);
  
    useEffect(() => {
        gsap.from([line1, line2], 0.8, {
            delay: 0.8,
            ease: "Power3.easeOut", 
            y: 64,
            rotation: 2,
            stagger: {
                amount: 0.15
            },
            opacity: 0
        });
  
    }, [line1, line2])
    
    return (
        <div>

            <h1 ref={el => (line1 = el)}>What Are you Brewing today? </h1>

            <div   ref={el => (line2 = el)} className="coffee--container">

            {
                brewMethods.map(brewMethod => {

                    return <BrewMethod key={brewMethod.id} brewMethod={brewMethod}  />
                })                
            }
            
            </div>
        </div>
        
    )
}