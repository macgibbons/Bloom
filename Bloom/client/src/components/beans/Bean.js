import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { BeanContext } from "./BeanProvider"
import { BrewContext } from "../brews/BrewProvider"


export default ({bean, history }) => {
    const { deleteBean } = useContext(BeanContext)
    const { brews, deleteBrew } = useContext(BrewContext)
    // const deleteConfirm = () => {
    //     if(window.confirm(`Are you sure you want to delete this coffee? This action cannot be undone`))
    //       { deleteBean(bean.id)
    //       }}
    
    const Beansbrews = brews.filter(brew => brew.beanId === bean.id) || {}
    const deleteConfirm = () => {
        if(window.confirm(`Are you sure you want to delete this coffee and it's brews? This action cannot be undone`))
        
        // check if selected coffee has any related brews. if so delete coffee and related brews else just delete the coffee
        
        { 
            Beansbrews.length >= 1 ?
            deleteBean(bean.id).then( () => {
                Beansbrews.forEach( b => {  deleteBrew(b.id) } )  
            })
                : deleteBean(bean.id)
        }
     }
    return(
    <section className="">

        <div className="coffee--card">
            <div className="coffee--title" >
                <Link  className="card--link" className={bean.regionId === 1 ? "africa" : bean.regionId === 2 ? "central" : bean.regionId === 3 ? "south" : "asia"}to={`/Coffee/${bean.id}`}>
                    { bean.beanName }
                {/* <div>
                    { bean.origin}
                </div> */}
                </Link>
                <div className="roaster">
                    { bean.roaster }
                </div>
            </div>
            <div className="coffee--content">
                <div>
                    { bean.tastingNotes.split(',' || '|') }
                </div>

<div className="coffee--info">

                <div className="info--pair">
                    <div className="pair--item">
                        Altitude
                    </div>
                     <div className="pair--item"> 
                        {bean.masl} m
                     </div>
                </div>
                <div className="info--pair">
                    Region <span>{bean.origin}</span>
                </div>
                <div className="info--pair">
                   <div> Process </div> 
                   <div>
                       {bean.process}
                    </div>
                </div>
                <div className="info--pair">
                    <div>
                        Varietals 
                    </div> 
                    <div>
                        {bean.variety}
                    </div>
                </div>
</div>

            </div>
            <div className="card--controls">
                <div className="card--control"
                    onClick={()=>{ deleteConfirm() }
                    }>delete</div>
                <div className="card--control"
                   onClick={() => {
                    history.push(`/coffee/edit/${bean.id}`)
                }} >edit</div>
            </div>
        </div>


        
    </section>
)
            }

