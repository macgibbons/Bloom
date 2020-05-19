import React, { useContext, useState} from "react"
import "./Brews.css"
import { BrewContext } from "./BrewProvider";
import Brew from "./Brew";
import { getUser } from "../../API/userManager";
import { BrewMethodContext } from "../equiptment/brewMethods/BrewMethodProvider";
import EmptyState from "../EmptyState";
import { GrinderContext } from "../equiptment/Grinders/GrinderProvider"


export default (props) => {
    // ***** CONTEXT *****
    const { brews } = useContext(BrewContext)
    const { brewMethods } = useContext(BrewMethodContext)
    const { grinders } = useContext(GrinderContext)
 
    // ***** STATE *****
    const [option, setOption] = useState("0")
    const [method, setMethod] = useState(0)
    const [roaster, setRoaster] = useState("")
    const [grinder, setGrinder] = useState(0)
    const [search, setSearch] = useState("")

    // ***** USER *****
    const user = getUser()
    const currentUserBrews = brews.filter(b => b.userId === user.id)
    const filteredBrews = currentUserBrews.filter(b => b.brewMethodId === parseInt(option))
    const userGrinders = grinders.filter(g => g.userId === user.id)

    const brewsByGrinder = currentUserBrews.filter(b => b.grinderId === parseInt(grinder))
    const brewsByMethod = currentUserBrews.filter(b => b.brewMethodId === parseInt(method))

    const searchedBrews = currentUserBrews.filter( (b) => 
    
    b.brewMethod.method.toLowerCase().includes(search.toLocaleLowerCase()) ||
    b.bean.roaster.toLowerCase().includes(search.toLocaleLowerCase()) ||
    b.bean.origin.toLowerCase().includes(search.toLocaleLowerCase()) ||
    b.bean.beanName.toLowerCase().includes( search.toLocaleLowerCase()) ||
    b.notes.toLowerCase().includes( search.toLocaleLowerCase()) ||
    b.rating.toString().includes( search.toLocaleLowerCase())
    
    
    )


    // ***** ROASTER *****

    let userRoasters = []

    currentUserBrews.forEach(b => {
       if( userRoasters.find(r => b.bean.roaster === r)){
        } else {
           userRoasters.push(b.bean.roaster)
       }
    }); 
   
    const brewsByRoaster = currentUserBrews.filter(b => b.bean.roaster.toLowerCase() === roaster.toLowerCase())

   
    
  
    
    if(user !== null) {
        document.body.classList.add("user--loggedIn")
    }

    const logInCheck = () => {
        if(user === ""){
            window.alert("please log in")
        } else {
            updateApplicationView()
        }
    }

    const updateApplicationView = () => {
        props.history.push("/brews/create")
    }

    const handleSelectChange = (e) => {
        setOption(e.target.value)
    }
   

    return (
        <div className="coffee--view">
            
       
            <div className="page--header">
                <div className="title--pair">
                    <div className="page--title">My Brews</div>
                    
               
            
                <div  onClick={() => {logInCheck()}} className="add--btn"><img className="add" src={require ('../../icons/addWhite.svg')}/>Add brew</div>
           

                    
                </div>

            <div className="header--filters">
                    <div >Method</div>
                    <select className="rounded" onChange={(evt)=>{setMethod(evt.target.value)}} >
                        <option value={0}>All</option>
                        {
                            brewMethods.map( b => <option value={b.id} > {b.method}</option>)
                        }
                    </select>
                    <div>Roaster</div>
                    <select onChange={(evt)=>{setRoaster(evt.target.value)}} className="rounded">
                        <option value={""}>All</option>
                            {
                                userRoasters.map( b => <option value={b} > {b}</option>)
                            }
                    </select>
                    <div>Grinder</div>
                    <select onChange={(evt)=>{setGrinder(evt.target.value)}} className="rounded">
                        <option value={0}>All</option>
                        {
                            userGrinders.map( g => <option value={g.id} > {g.brand} {g.model}</option>)
                        }
                    </select>
                    <div>Keywords</div>
                    <input className="rounded" type='text' placeHolder="juicy, floral, etc" onChange={evt => setSearch(evt.target.value)}/>
            </div>
            
            
            </div>
            
                <div className="coffee--container">
                {  
            search === "" ?
                 parseInt(method) === 0 ?
                    grinder !== 0 ? 
                 
                        brewsByGrinder.length === 0 ? 
                        
                            <EmptyState /> 
                        :
                            brewsByGrinder.map(brew => {
                                return <Brew key={brew.id} brew={brew} {...props} />}) 
                    : 

                        roaster === "" ? 

                            currentUserBrews.map(brew => {
                                return <Brew key={brew.id} brew={brew} {...props} />}) 
                        : 
                            brewsByRoaster.map(brew => {
                                return <Brew key={brew.id} brew={brew} {...props} />}) 
                :

                    brewsByMethod.length > 0 ?

                        brewsByMethod.map(brew => {
                            return <Brew key={brew.id} brew={brew} {...props} />}) 
                    :   
                        <EmptyState />
            : 
                searchedBrews.length > 0 ?
                    searchedBrews.map(brew => {
                        return <Brew key={brew.id} brew={brew} {...props} />})
                :
                    <EmptyState />
            }
                    
                    {/* {
                    option === '0' ? 
                        currentUserBrews.map(brew => {
                            return <Brew key={brew.id} brew={brew} {...props} />
                        })  : filteredBrews.length === 0 ?
                        <div className="coffee--card add--bean"><EmptyState /> </div>:
                        filteredBrews.map(brew => {
                            return <Brew key={brew.id} brew={brew} {...props} />
                        })
                                    
                    } */}
                    {/* <a  className="coffee--card add--bean"
                        onClick={() => {logInCheck()}}>

                        <img className="add--icon" src={require ("../../icons/add.svg")}/>
                    </a> */}
                </div>
           
        </div>
    )
}