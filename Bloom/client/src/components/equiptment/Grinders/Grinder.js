import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { GrinderContext } from "./GrinderProvider"


export default ({grinder}) => {
  const { deleteGrinder } = useContext(GrinderContext)
  return(
    <section className="">

        <div className="coffee--card">
            <div className="">
              {grinder.brand} 
            </div>
            
              {grinder.model}
              <span   
                onClick={() => {
                  deleteGrinder(grinder.id)
                }}>delete</span>
              <span>edit</span>
        </div>


        
    </section>
)

  }
