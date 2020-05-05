import React from "react"
import { Link } from "react-router-dom"


export default ({grinder}) => (
    <section className="">

        <div className="coffee--card">
            <div className="">
              {grinder.brand} 
            </div>
            
              {grinder.model}
        </div>


        
    </section>
)


