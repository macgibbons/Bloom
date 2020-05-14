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
    const chosenBeanId = parseInt(props.match.params.beanId, 10)
    const bean = beans.find(bean => bean.id === chosenBeanId) || {}
    const Beansbrews = brews.filter(brew => brew.beanId === bean.id) || {}
   
    // ****************** OTHER **********************
    var moment = require('moment')

    if(user !== null) {
        document.body.classList.add("user--loggedIn")
    }

    // ****************** API **********************
    const deleteConfirm = () => {
        if(window.confirm(`Are you sure you want to delete this coffee and it's brews? This action cannot be undone`))
      
        // check if selected coffee has any related brews. if so delete coffee and related brews else just delete the coffee
        
        { Beansbrews.length >= 1 ?
            deleteBean(bean.id).then( () => {
                Beansbrews.forEach( b => {  deleteBrew(b.id) } )  
            }).then(() => {
                props.history.push("/coffee")
            })
             : deleteBean(bean.id).then( () => {
            props.history.push("/coffee")
        })
          }}


    // ****************** COMPONENT **********************
return (
    <section className="detail--container">

        <div className="detail--header">

            <div className="detail--buttons">

                <div className="btn delete--btn"
                    onClick={ () => { deleteConfirm() } }>
                    <img className="icon" src={require ('../../icons/trash.svg')}/>
                </div>

                <div className="btn edit--btn detail--btn"
                    onClick={ () => { props.history.push(`/coffee/edit/${bean.id}`) } }>
                    <img className="icon" src={require ('../../icons/edit.svg')}/>
                </div>
                    
            </div>

        </div>

        <div className="detail--content">

            <StarRatingDisplay displayRating={bean.rating} />
            <div>{bean.beanName}</div>
            <div>{bean.roaster}</div>
            <div>{bean.origin}</div>
            <div>{bean.quantity}g</div>
            <div>{bean.roastLevel} roast</div>
            <div>Roast Date: {moment(bean.roastDate).format('MM | DD | YY')}</div>
            <div>{bean.masl} MASL</div>
            <div>process: {bean.process}</div>
            <div>{bean.tastingNotes}</div>

            <div className="card--detailPair">

                <div className="card--subTitle">Notes: {bean.notes}</div>
            
            </div>

            <div>
                {
                    Beansbrews.length >= 1 ?

                    <>
                    <div>Brews:</div>
                        <ul>
                            {
                                Beansbrews.map(
                                    b => <li>{b.coffeeDose}g {b.waterDose}g {b.brewMethod.method} { moment.utc(b.brewTime * 1000).format('m:ss')}</li>
                                    
                                )
                            }
                        </ul>
                    </>
                    :
                     <div>No Brews Yet</div>
                    }
            </div>
        </div>
        
    </section>
    )

}

