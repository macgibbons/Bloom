import React from "react"
import { Link } from "react-router-dom"
import moment from 'moment';

export default ({ brew }) => (
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
        
        </div>


        
    </section>
)


