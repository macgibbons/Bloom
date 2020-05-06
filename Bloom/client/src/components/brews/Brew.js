import React, { useContext } from "react"
import { Link } from "react-router-dom"
import moment from 'moment';
import { BrewContext } from "./BrewProvider";

export default ({ brew }) => {

    const { deleteBrew } = useContext(BrewContext)
  
    const deleteConfirm = () => {
     if(window.confirm(`Are you sure you want to delete this brew? This action cannot be undone`))
       {deleteBrew(brew.id)
       }}
    
return (
    <section className="">
        <div className="coffee--card">
            
            <div>
                <h1>{ brew.brewMethod.method }</h1>
                <div>{ moment(brew.brewDate).format('MM | DD | YY') }</div>
            </div>

            <div>
                <div>{ brew.bean.beanName }</div>
                <div>{ brew.bean.roaster }</div>
            </div>

            <div>
                <div>{ brew.coffeeDose }g</div>
                <div>{ brew.waterDose }g</div>
                <div>{ moment.utc(brew.brewTime * 1000).format('m:ss') }</div>
            </div>
            <div className="card--controls">
                <div className="card--control"
                    onClick={()=>{ deleteConfirm() }
                    }>delete</div>
                <div className="card--control">edit</div>
            </div>
        </div>


    </section>
)


}