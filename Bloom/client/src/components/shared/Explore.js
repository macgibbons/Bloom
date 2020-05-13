import React, { useContext, useState, useEffect } from "react"
import { BrewContext } from "../brews/BrewProvider";
import { getUser } from "../../API/userManager";
import { BrewMethodContext } from "../equiptment/brewMethods/BrewMethodProvider";
import SharedBrew from "./SharedBrew";
import EmptyState from "../EmptyState";
import './Explore.css'



export default (props) => {

    // ***** CONTEXT *****
    const { brews } = useContext(BrewContext)
    const { brewMethods } = useContext(BrewMethodContext)
 
    // ***** STATE *****
    const [option, setOption] = useState("0")
    const [search, setSearch] = useState("")
    const [ reverse, setReverse ] = useState(true)

    // ***** USER *****
    const user = getUser()

    if(user !== null) {
        document.body.classList.add("user--loggedIn")
    }



    // ***** Filters *****
    const sharedBrews = reverse ? brews.filter(b => b.shared === true).reverse() : brews.filter(b => b.shared === true)
    const filteredBrews = sharedBrews.filter(b => b.brewMethodId === parseInt(option) )
    const searchedBrews = sharedBrews.filter( b => b.user.firstName.toLowerCase().includes(search.toLocaleLowerCase())) || sharedBrews.filter(  b => b.brewMethod.method.toLowerCase().includes( search.toLocaleLowerCase())) 
    
  

    const handleSelectChange = (e) => {
        setOption(e.target.value)
    }
   
    const handleSortChange = (e) => {
        console.log(e.target.value)
        if (e.target.value === "0" || e.target.value === "1"){
            setReverse(true)
        } else {
            setReverse(false)
        }
    }
    return (
        <div className="explore--view">

            <div className="explore--filters">

               

                    <select className="filter" onChange={handleSelectChange} value={option}>
                        <option value={0}>please select a filter</option>
                        {
                            brewMethods.map( b => <option value={b.id} > {b.method}</option>)
                        }
                    </select>

                    <input className="filter" type='text' placeholder="Search..." onChange={evt => setSearch(evt.target.value)}/>
            
            </div>
         

            <div className="explore--container">
                        <div className="">explore</div> 
                        <div className="EC--sort">
                            <div> {reverse ? "Newest" : "Oldest"}</div>
                            <select className="EC--sortDD" onChange={handleSortChange}  >
                                <option value="1">newest</option>
                                <option value="2">oldest</option>
                            </select>
                        </div>
            { 
                  option === '0' ? search === ''  ?  
                        sharedBrews.map(brew => {
                            return <SharedBrew key={brew.id} brew={brew} {...props} />
                            }) 
                        :  
                    searchedBrews.length > 0 ?
                        searchedBrews.map(brew => {
                            return <SharedBrew key={brew.id} brew={brew} {...props} />
                            }) 
                        :
                    filteredBrews.length > 0 ? 
                        filteredBrews.map(brew => {
                            return <SharedBrew key={brew.id} brew={brew} {...props} />
                             }) 
                        : 
                        <EmptyState />
                        
                        :
                    filteredBrews.length === 0 ? <EmptyState /> :
                        filteredBrews.map(brew => {
                            return <SharedBrew key={brew.id} brew={brew} {...props} />
                        })
            }
            
            </div>
        </div>
    )
}

