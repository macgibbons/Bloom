import React, { useContext } from "react"
import "./Beans.css"
import { BeanContext } from "./BeanProvider";
import Bean from "./Bean";
import { getUser } from "../../API/userManager";


export default (props) => {
    // ***** CONTEXT *****
    const { beans } = useContext(BeanContext)
 

    // ***** USER *****
   const user = getUser()
    const currentUserBeans = beans.filter(b => b.userId === user.id)
    console.log(user.id);
    

    if(user !== null) {
        document.body.classList.add("user--loggedIn")
    }
   
    return (
        <div className="">
            <div className="">My Coffee</div>
          
            <div className="">

            {
                currentUserBeans.map(bean => {

                    return <Bean key={bean.id} bean={bean}  />
                })                
            }
            
            </div>
        </div>
    )
}