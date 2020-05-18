import React, { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import moment from 'moment';
import { BrewContext } from "./BrewProvider";
import { getUser } from "../../API/userManager";

export default ({ brew, history}) => {

    const user = getUser()
    const { deleteBrew, updateBrew } = useContext(BrewContext)
    const [share, setShare] = useState(false)
    const [unshare, setUnshare ] = useState(false)
  
    const deleteConfirm = () => {
     if(window.confirm(`Are you sure you want to delete this brew? This action cannot be undone`))
       {deleteBrew(brew.id)
       }}

       const shareConfirm = () => {
           if(window.confirm(`Are you sure you want to share your brew of ${brew.bean.beanName}?`))
           {
            updateBrew({
            id: brew.id,
            coffeeDose:brew.coffeeDose,
            waterDose: brew.waterDose,
            waterTemp: brew.waterTemp,
            brewTime: brew.brewTime,
            rating: brew.rating,
            notes: brew.notes,
            brewDate: brew.brewDate,
            grindSetting: brew.grindSetting,
            grinderId:brew.grinderId,
            brewMethodId: brew.brewMethodId,
            beanId: brew.beanId,
            shared: true,
            userId: user.id
           }).then(setShare(true))}
       }
       const unshareConfirm = () => {
        if(window.confirm(`Are you sure you want to remove your post from the explore page?`))
        {
         updateBrew({
         id: brew.id,
         coffeeDose:brew.coffeeDose,
         waterDose: brew.waterDose,
         waterTemp: brew.waterTemp,
         brewTime: brew.brewTime,
         rating: brew.rating,
         notes: brew.notes,
         brewDate: brew.brewDate,
         grindSetting: brew.grindSetting,
         grinderId:brew.grinderId,
         brewMethodId: brew.brewMethodId,
         beanId: brew.beanId,
         shared: false,
         userId: user.id
        }).then(setUnshare(true))}
    }
    
return (
    <section className="">
        <div className="coffee--card">
            
            <div>
                {/* <h1>{ brew.brewMethod.method }</h1> */}
                <Link  className="card--link" to={`/brews/${brew.id}`}>
                    { brew.brewMethod.method }
                </Link>
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
            <div className="EC--controls ">
                { 
                    brew.shared ? 
                    <div className="card--control"
                    onClick={()=>{ unshareConfirm() }
                    }>unshare</div>
                        :
                        <div className="card--control"
                            onClick={()=>{ shareConfirm() }
                            }>share</div>
                }
                <div className="card--control"
                    onClick={()=>{ deleteConfirm() }
                    }>delete</div>
                <div className="card--control"
                   onClick={() => {
                    history.push(`/brews/edit/${brew.id}`)
                }} >edit</div>
            </div>
            <div> {share ? `successfully shared` : ""}</div>
            <div> {unshare ? `successfully removed` : ""}</div>
        </div>


    </section>
)


}