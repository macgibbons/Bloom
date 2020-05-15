import React, { useContext, useState } from "react"
import { getUser } from "../../API/userManager";
import { UserContext } from "../../API/UserProvider";
import { BeanContext } from "../beans/BeanProvider";
import { BrewContext } from "../brews/BrewProvider";
import SharedBrew from "./SharedBrew";
import Bean from "../beans/Bean";
import { FaRegUserCircle } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";


export default (props) => {


    // ***** CONTEXT *****
    const { beans } = useContext(BeanContext)
    const { users } = useContext(UserContext)
    const { brews } = useContext(BrewContext)
    

    // ***** STATE *****
    const [view, setView] = useState("brews")


    // ***** USER *****
   const currentUser = getUser()
   const chosenUserId = props.match.params.userId
   const user = users.find(user => user.id === chosenUserId) || {}
   const userBeans = beans.filter(bean => bean.userId === chosenUserId)
   const userBrews = brews.filter(brew => brew.userId === user.id)
   const userSharedBrews = userBrews.filter(brew => brew.shared === true)
   

    

    // ***** COMPONENT *****
   
    return (
        <div className="explore--view">

            <div className="explore--filters">

                <button  className="profile--filter" onClick={()=>setView("brews")}>
                    brews
                </button>
                <button className="profile--filter" onClick={()=>setView("coffee")}>
                    coffee
                </button>

                <div className=" profile--username">
                    {user.firstName} {user.lastName} <span>{ user.lastName === "Coffee"  ? <MdVerifiedUser className="gradient" size={20} /> : "" }</span>
                </div>
                
                <FaRegUserCircle className="gradient" size={100}/>
                
            </div>

            <div className="explore--container">

                {
                    view === "coffee" ?
                    <div>
                        {
                            userBeans.map(bean => {
                                return <Bean key={bean.id} bean={bean} {...props} />
                            })
                        }
                    </div> : 
                    <div>
                        {
                            userSharedBrews.map(brew => {
                                return <SharedBrew key={brew.id} brew={brew} {...props} />
                            })
                        }
                    </div>
                }

            </div>

        </div>
    )
}