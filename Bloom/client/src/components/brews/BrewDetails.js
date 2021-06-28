import { moment } from "moment";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { getUser } from "../../API/userManager";
import { BeanContext } from "../beans/BeanProvider";
import { BrewMethodContext } from "../equiptment/brewMethods/BrewMethodProvider";
import { GrinderContext } from "../equiptment/Grinders/GrinderProvider";
import StarRatingDisplay from "../StarRatingDisplay";
import { BrewContext } from "./BrewProvider";
import "./Brews.css";


export default (props) => {
    const { brews, deleteBrew } = useContext(BrewContext)
    const { brewMethods } = useContext(BrewMethodContext)
    const { beans } = useContext(BeanContext)
    const { grinders } = useContext(GrinderContext)
    const user = getUser()
    const chosenBrewId = parseInt(props.match.params.brewId, 10)

    const brew = useMemo(() => {
        return brews.find(brew => brew.id === chosenBrewId) || {}
    }, [brews, chosenBrewId])

    const brewMethod = useMemo(() => {
        return brewMethods.find(brewMethod => brewMethod.id === brew.brewMethodId) || {}
    }, [brewMethods, brew])

    const bean = useMemo(() => {
        return beans.find(bean => bean.id === brew.beanId) || {}
    }, [beans, brew])

    const grinder = useMemo(() => {
        return grinders.find(grinder => grinder.id === brew.grinderId) || {}
    }, [grinders, brew])
   
    var brewRatio = useMemo(() => {
        return brew.waterDose / brew.coffeeDose //returns the water ratio as a decimal
    }, [brew.waterDose, brew.coffeeDose])

    useEffect(() => {
        if(user !== null) {
            document.body.classList.add("user--loggedIn")
        }
    },[user])

    const deleteConfirm = useCallback(() => {
        if(window.confirm(`Are you sure you want to delete this brew? This action cannot be undone`)) {
              deleteBrew(brew.id).then(() => { props.history.push("/brews")})
        }
    }, [brew.id, props, deleteBrew])

    const handleEditRedirect = useCallback(() => {
        props.history.push(`/brews/edit/${brew.id}`)
    },[brew.id, props])

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
            {
                brew.userId === user.Id 
                &&
                <div className="card--controls flex--row">
                    <div 
                        className="card--control"
                        onClick={deleteConfirm}>
                            delete
                    </div>
                    <div 
                        className="card--control"
                        onClick={handleEditRedirect}>
                            edit
                    </div>
                </div>
            }
            </div>
        </section>
    )

}

