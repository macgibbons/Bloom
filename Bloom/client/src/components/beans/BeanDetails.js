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
    <section className="coffee--view">
        <div className="detail--container center">


        <div className="detail--header">


        </div>

        <div className="detail--content">

            <StarRatingDisplay displayRating={bean.rating} />
            <div className="detail--title">{bean.beanName}</div>
            <div className="detail--pairs">

            <div className="form--pair">
                <div><span className="bold">Roaster:</span>{bean.roaster}</div>
                <div><span className="bold">Origin:</span>{bean.origin}</div>

            </div>
            <div className="form--pair">
                <div><span className="bold">Quantity:</span>{bean.quantity}g</div>
                <div><span className="bold">Roast Level:</span>{bean.roastLevel} roast</div>

            </div>
            <div className="form--pair">

                <div><span className="bold">Roast Date:</span>{moment(bean.roastDate).format('MM | DD | YY')}</div>
                <div><span className="bold">Altitude:</span>{bean.masl} MASL</div>
            </div>
            <div><span className="bold">Process:</span> {bean.process}</div>
            </div>
            <div className="detail--pairs">

            <div><span className="bold">Tasting Notes:</span>{bean.tastingNotes}</div>

            </div>
            <div className="card--detailPair">

                <div ><span className="bold">Notes:</span>{bean.notes}</div>
            
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
            <div className="card--controls flex--row">

                <div className="card--control"
                    onClick={ () => { deleteConfirm() } }>
                        delete
                    {/* <img className="icon" src={require ('../../icons/trash.svg')}/> */}
                </div>

                <div className="card--control"
                    onClick={ () => { props.history.push(`/coffee/edit/${bean.id}`) } }>
                        edit
                    {/* <img className="icon" src={require ('../../icons/edit.svg')}/> */}
                </div>
                    
            </div>
        </div>
    </section>
    )

}

