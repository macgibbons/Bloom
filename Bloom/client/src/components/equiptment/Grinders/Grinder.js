import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { GrinderContext } from "./GrinderProvider"


export default ({ grinder }) => {
  const { deleteGrinder } = useContext(GrinderContext)
  
  const deleteConfirm = () => {
   if(window.confirm(`Are you sure you want to delete ${grinder.brand} ${grinder.model}`))
     {deleteGrinder(grinder.id)
     }}
  
     return(
    <section className="">

        <div className="coffee--card">
            <div className="">
              {grinder.brand} 
            </div>
            
              {grinder.model}
              <span   
                onClick={() => {
                  deleteConfirm()
                }}>delete</span>
              <span>edit</span>
        </div>


        
    </section>
)

  }
