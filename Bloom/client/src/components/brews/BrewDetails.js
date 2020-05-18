import React, { useContext } from "react"
import "./Brews.css"
import { BrewContext } from "./BrewProvider";
import { getUser } from "../../API/userManager";
import { BrewMethodContext } from "../equiptment/brewMethods/BrewMethodProvider";
import { BeanContext } from "../beans/BeanProvider";
import StarRatingDisplay from "../StarRatingDisplay";
import { GrinderContext } from "../equiptment/Grinders/GrinderProvider";


export default (props) => {

    // ****************** CONTEXT **********************
    const { brews, deleteBrew } = useContext(BrewContext)
    const { brewMethods } = useContext(BrewMethodContext)
    const { beans } = useContext(BeanContext)
    const { grinders } = useContext(GrinderContext)
    
    // ****************** USER **********************
    const user = getUser()

    // ****************** USER DATA **********************
    const chosenBrewId = parseInt(props.match.params.brewId, 10)
    const brew = brews.find(brew => brew.id === chosenBrewId) || {}
    const brewMethod = brewMethods.find(brewMethod => brewMethod.id === brew.brewMethodId) || {}
    const bean = beans.find(bean => bean.id === brew.beanId) || {}
    const grinder = grinders.find(grinder => grinder.id === brew.grinderId) || {}
   
    // ****************** OTHER **********************
    var brewRatio = brew.waterDose / brew.coffeeDose //this returns the water ratio as a decimal

    var moment = require('moment')

    if(user !== null) {
        document.body.classList.add("user--loggedIn")
    }

    const deleteConfirm = () => {
        if(window.confirm(`Are you sure you want to delete this brew? This action cannot be undone`))
          {deleteBrew(brew.id).then(() => {
            props.history.push("/brews")
        })
          }}
    // ****************** COMPONENT **********************
    return (
        <section className="coffee--view">

            <div className="brewDetail--container center">

         

            <div className="detail--content">

                <div  className="detail--title">{brewMethod.method}</div>
                <StarRatingDisplay displayRating={brew.rating} />
                <div className="card--control"><span className="bold">posted on:</span>{moment(brew.brewDate).format('MM | DD | YY')}</div>
                <div className="detail--pairs">

                    <div className="form--pair">
                        <div><span className="bold">Coffee: </span>{bean.beanName}</div>
                        <div><span className="bold">Roaster: </span>{bean.roaster}</div>
                    </div>
                    <div className="form--pair">

                        <div><span className="bold">Origin: </span>{bean.origin}</div>
                        <div><span className="bold">Boom: </span>{brew.bloom}s</div>
                    </div>

                        <div className="form--pair">
                            <div><span className="bold">Brew Time: </span>{ moment.utc(brew.brewTime * 1000).format('m:ss')}</div>
                            <div><span className="bold">Grinder: </span>{grinder.brand} {grinder.model}</div>
                        </div>
                    <div><span className="bold">Grind Setting: </span>{brew.grindSetting}</div>
                    <div><span className="bold">Dose: </span>{brew.coffeeDose}g</div>
                    <div><span className="bold">Water: </span>{brew.waterDose}g</div>
                    <div> <span className="bold">Brew Ratio: </span>1 : {brewRatio % 1 === 0 ? brewRatio : brewRatio.toFixed(1)}</div> 

                </div>
      
                
                    <div className=""><span className="bold">Notes:</span> {brew.notes}</div>
                  
            </div>
                <div className="card--controls flex--row">

                    <div className="card--control"
                        onClick={ () => { deleteConfirm() } }>
                            delete
                        {/* <img className="icon" src={require ('../../icons/trash.svg')}/> */}
                    </div>

                    <div className="card--control"
                        onClick={ () => { props.history.push(`/brews/edit/${brew.id}`) } }>
                            edit
                        {/* <img className="icon" src={require ('../../icons/edit.svg')}/> */}
                    </div>
                    
                </div>
            </div>

        
          
            
        </section>
    )

}

