import React, { useContext } from "react"
import "./Beans.css"
import { getUser } from "../../API/userManager";
import { BrewMethodContext } from "../equiptment/brewMethods/BrewMethodProvider";
import { BeanContext } from "../beans/BeanProvider";
import StarRatingDisplay from "../StarRatingDisplay";
import { GrinderContext } from "../equiptment/Grinders/GrinderProvider";
import { BrewContext } from "../brews/BrewProvider";


export default (props) => {

    // ****************** CONTEXT **********************
    const { brews, deleteBrew } = useContext(BrewContext)
    const { brewMethods } = useContext(BrewMethodContext)
    const { beans, deleteBean } = useContext(BeanContext)
    const { grinders } = useContext(GrinderContext)
    
    // ****************** USER **********************
    const user = getUser()

    // ****************** USER DATA **********************
    const choseBeanId = parseInt(props.match.params.beanId, 10)
    //const brew = brews.find(brew => brew.id === chosenBrewId) || {}
   // const brewMethod = brewMethods.find(brewMethod => brewMethod.id === brew.brewMethodId) || {}
    const bean = beans.find(bean => bean.id === choseBeanId) || {}
   // const grinder = grinders.find(grinder => grinder.id === brew.grinderId) || {}
   
    // ****************** OTHER **********************
    //var brewRatio = brew.waterDose / brew.coffeeDose //this returns the water ratio as a decimal

    var moment = require('moment')

    if(user !== null) {
        document.body.classList.add("user--loggedIn")
    }

    const deleteConfirm = () => {
        if(window.confirm(`Are you sure you want to delete this brew? This action cannot be undone`))
          {deleteBrew(bean.id).then(() => {
            props.history.push("/coffee")
        })
          }}
    // ****************** COMPONENT **********************
    return (
        <section className="detail--container">

            <div className="detail--header">

                {/* <div  className="detail--title">{brewMethod.method}</div> */}

                <div className="detail--buttons">

                    <div className="btn delete--btn"
                        onClick={ () => { deleteConfirm() } }>
                        <img className="icon" src={require ('../../icons/trash.svg')}/>
                    </div>

                    <div className="btn edit--btn detail--btn"
                        onClick={ () => { props.history.push(`/brews/edit/${bean.id}`) } }>
                        <img className="icon" src={require ('../../icons/edit.svg')}/>
                    </div>
                    
                </div>

            </div>

            <div className="detail--content">

                <StarRatingDisplay displayRating={bean.rating} />
                <div>{bean.beanName}</div>
                <div>{bean.roaster}</div>
                <div>{bean.origin}</div>
                {/* <div>{moment(brew.brewDate).format('MM | DD | YY')}</div>
                <div>Bloom Length: {brew.bloom}s</div>
                <div>Brew Time: { moment.utc(brew.brewTime * 1000).format('m:ss')}</div>
                <div>Grinder: {grinder.brand} {grinder.model}</div>
                <div>Grinder setting: {brew.grindSetting}</div>
                <div>Dose: {brew.coffeeDose}g</div>
                <div>Water Dose: {brew.waterDose}g</div>
                <div> Brew Ratio: 1 : {brewRatio % 1 === 0 ? brewRatio : brewRatio.toFixed(1)}</div> 
       */}
                <div className="card--detailPair">
                    <div className="card--subTitle">Notes: {bean.notes}</div>
                    <p></p>
                </div>
            </div>

        
          
            
        </section>
    )

}

