import React, { useContext } from "react"
import "./Brews.css"
import { BrewContext } from "./BrewProvider";
import { getUser } from "../../API/userManager";
import { BrewMethodContext } from "../equiptment/brewMethods/BrewMethodProvider";
import { BeanContext } from "../beans/BeanProvider";
import StarRating from "../StarRating";

export default (props) => {
    const { brews, deleteBrew } = useContext(BrewContext)
    const { brewMethods } = useContext(BrewMethodContext)
    const { beans } = useContext(BeanContext)
    
    const user = getUser()
    const chosenBrewId = parseInt(props.match.params.brewId, 10)

    const brew = brews.find(brew => brew.id === chosenBrewId) || {}
    const brewMethod = brewMethods.find(brewMethod => brewMethod.id === brew.brewMethodId) || {}
    const bean = beans.find(bean => bean.id === brew.beanId) || {}

    var moment = require('moment')

    if(user !== null) {
        document.body.classList.add("user--loggedIn")
    }
console.log("Brew:", brew);
    return (
        <section className="plant--detailCard plant--container">

            <div className="plant--detailHeader">
                <div className="header--buttons">
                    <div className="header detail--header plant--detailName"></div>
                    <div className="btns">
                        <div className="btn delete--btn"
                            onClick={() => {
                                deleteBrew(chosenBrewId)
                                    .then(() => {
                                        props.history.push("/brews")
                                    })
                                }}>
                                    <button>delete</button>
                            {/* <img className="icon" src={require ('./trash.svg')}/> */}
                        </div>

                        <div className="btn edit--btn"
                            onClick={() => {
                                props.history.push(`/brews/edit/${brew.id}`)
                            }}>
                                <button>edit</button>
                            {/* <img className="icon" src={require ('./edit.svg')}/> */}
                        </div>
                    </div>
                </div>


                <div>{brewMethod.method}</div>
                <div>{bean.beanName}</div>
                <div>{bean.roaster}</div>
                <div>{bean.origin}</div>
                <div>{moment(brew.brewDate).format('MM | DD | YY')}</div>
                <div>Bloom Length: {brew.bloom}s</div>
                <div>BrewTime: { moment.utc(brew.brewTime * 1000).format('m:ss')}</div>
                <div>Grinder:</div>
                <div>Grinder setting: {brew.grindSetting}</div>
                <div>Dose: {brew.coffeeDose}g</div>
                <div>waterDose: {brew.waterDose}g</div>
                        <div> brew Ratio: {brew.waterDose / brew.coffeeDose}</div>
      
                <div className="card--detailPair">
                    <div className="card--subTitle">Notes:</div>
                    <p>{brew.notes}</p>
                </div>

        </div>
          
            
        </section>
    )

}

