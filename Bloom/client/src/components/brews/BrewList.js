import React, { useContext, useState, useEffect } from "react"
import "./Brews.css"
import { BrewContext } from "./BrewProvider";
import Brew from "./Brew";
import { getUser } from "../../API/userManager";
import { BrewMethodContext } from "../equiptment/brewMethods/BrewMethodProvider";
import EmptyState from "../EmptyState";



export default (props) => {
    // ***** CONTEXT *****
    const { brews } = useContext(BrewContext)
    const { brewMethods } = useContext(BrewMethodContext)
 
    // ***** STATE *****
    const [option, setOption] = useState("0")

    // ***** USER *****
    const user = getUser()
    const currentUserBrews = brews.filter(b => b.userId === user.id)
    const filteredBrews = currentUserBrews.filter(b => b.brewMethodId === parseInt(option))

  
    
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
            
       
            <div className="page--header">
                <div className="title--pair">
                    <div className="page--title">My Brews</div>
                    
               
            
                <div  onClick={() => {logInCheck()}} className="add--btn"><img className="add" src={require ('../../icons/addWhite.svg')}/>Add brew</div>
           

                    
                </div>

            <div className="header--filters">
                    <div >Method</div>
                    <select className="rounded" onChange={handleSelectChange} value={option}>
                        <option value={0}>All</option>
                        {
                            brewMethods.map( b => <option value={b.id} > {b.method}</option>)
                        }
                    </select>
                    <div >Roaster</div>
                    <select className="rounded">
                        <option value={0}>All</option>
                    </select>
                    <div>Grinder</div>
                    <select className="rounded">
                        <option value={0}>All</option>
                    </select>
                    <div>Keywords</div>
                    <input className="rounded" ></input>
            </div>

            </div>
            
                <div className="coffee--container">
                    
                    {
                    option === '0' ? 
                        currentUserBrews.map(brew => {
                            return <Brew key={brew.id} brew={brew} {...props} />
                        })  : filteredBrews.length === 0 ?
                        <div className="coffee--card add--bean"><EmptyState /> </div>:
                        filteredBrews.map(brew => {
                            return <Brew key={brew.id} brew={brew} {...props} />
                        })
                                    
                    }
                    <a  className="coffee--card add--bean"
                        onClick={() => {logInCheck()}}>

                        <img className="add--icon" src={require ("../../icons/add.svg")}/>
                    </a>
                </div>
           
        </div>
    )
}