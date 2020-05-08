import React, { useContext, useState, useEffect } from "react"
import { Link, Route } from "react-router-dom"
import { GrinderContext } from "./GrinderProvider"
import GrinderForm from "./GrinderForm"


export default ({ grinder}) => {
  const { deleteGrinder } = useContext(GrinderContext)
  const [form, setForm] = useState(false)
  
  const deleteConfirm = () => {
   if(window.confirm(`Are you sure you want to delete ${grinder.brand} ${grinder.model}`))
     {deleteGrinder(grinder.id)
     }}
  
     useEffect(() => {

      console.log(form) 
      console.log(setForm)     
    }, [form]);

     return(
    <section className="">

        <div className="coffee--card">

              <div>
                { form ? 

                <>
                <Route render= {props => <GrinderForm  isFormShowing={setForm} grinderId={grinder.id} {...props} />} /> 
                <button className="btn" onClick={ ()=> { setForm(false) } }>Hide</button>
                </> : 
                <div>
                  
            <div className="">{grinder.brand}</div>
            <div>{grinder.model}</div>
            <div className="card--controls">

              <div className="card--control"
                  onClick={() => {
                    deleteConfirm()
                  }}>delete
              </div>
              <div className="card--control"
                  onClick={ () => { setForm(true) } }>edit
              </div>
              
            </div>
                </div> 
                }
          
            </div>
        </div>


        
    </section>
)

  }
