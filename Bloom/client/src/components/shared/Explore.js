import React, { useContext, useState, useEffect } from "react"
import { BrewContext } from "../brews/BrewProvider";
import Brew from "../brews/Brew";
import { getUser } from "../../API/userManager";
import { BrewMethodContext } from "../equiptment/brewMethods/BrewMethodProvider";
import SharedBrew from "./SharedBrew";



export default (props) => {
    // ***** CONTEXT *****
    const { brews } = useContext(BrewContext)
    const { brewMethods } = useContext(BrewMethodContext)
 
    // ***** STATE *****
    const [option, setOption] = useState("0")

    // ***** USER *****
    const user = getUser()
    const sharedBrews = brews.filter(b => b.shared === true)
    const filteredBrews = sharedBrews.filter(b => b.brewMethodId === parseInt(option))

  
    
    if(user !== null) {
        document.body.classList.add("user--loggedIn")
    }

    const logInCheck = () => {
        if(user === ""){
            window.alert("please log in")
        } else {
            console.log("user is logged in");
            updateApplicationView()
        }
    }

    const updateApplicationView = () => {
        props.history.push("/brews/create")
    }

    const handleSelectChange = (e) => {
        setOption(e.target.value)
    }
   
    return (
        <div className="coffee--view">
            <div className="">My Brews</div>
          
          <select onChange={handleSelectChange} value={option}>
              <option value={0}>please select a filter</option>
              {
                  brewMethods.map( b => <option value={b.id} > {b.method}</option>)
              }
          </select>
            <button className="btn add--btn"
                    onClick={() => {logInCheck()}}>
            add brew
            </button>
            <div className="coffee--container">
              
            {
               option === '0' ? 
                sharedBrews.map(brew => {
                    return <SharedBrew key={brew.id} brew={brew} {...props} />
                })  : filteredBrews.length === 0 ?
                'no brews' :
                filteredBrews.map(brew => {
                    return <SharedBrew key={brew.id} brew={brew} {...props} />
                })
                              
            }
            
            </div>
        </div>
    )
}