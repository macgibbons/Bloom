import React, { useContext } from "react"
import "./Brews.css"
import { BrewContext } from "./BrewProvider";
import Brew from "./Brew";
import { getUser } from "../../API/userManager";



export default (props) => {
    // ***** CONTEXT *****
    const { brews } = useContext(BrewContext)
 

    // ***** USER *****
    const user = getUser()
    const currentUserBrews = brews.filter(b => b.userId === user.id)

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
   
    return (
        <div className="coffee--view">
            <div className="">My Brews</div>
          
            <button className="btn add--btn"
                    onClick={() => {logInCheck()}}>
            add brew
            </button>
            <div className="coffee--container">

            {
                currentUserBrews.map(brew => {

                    return <Brew key={brew.id} brew={brew}  />
                })                
            }
            
            </div>
        </div>
    )
}