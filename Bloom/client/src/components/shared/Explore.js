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
    const searchedBrews = sharedBrews.filter( (b) => 

        b.user.firstName.toLowerCase().includes(search.toLocaleLowerCase()) ||
        b.brewMethod.method.toLowerCase().includes( search.toLocaleLowerCase()) ||
        b.notes.toLowerCase().includes( search.toLocaleLowerCase()) ||
        b.bean.beanName.toLowerCase().includes( search.toLocaleLowerCase()) ||
        b.bean.origin.toLowerCase().includes( search.toLocaleLowerCase()) ||
        b.user.lastName.toLowerCase().includes( search.toLocaleLowerCase())
        
        )
    
        
    
  

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
        <section className="explore--view">
         

            <div className="explore--container">
                <div className="page--header">

                <div className="page--title">explore</div> 
                <div className="header--filters">
                    <div className="title--pair no-pad">
                        <div className="row no-pad">

                            <div className="">Brew methods</div>
                            <select className="rounded small--dd" onChange={handleSelectChange} value={option}>
                                <option value={0}>All</option>
                                {
                                    brewMethods.map( b => <option value={b.id} > {b.method}</option>)
                                }
                            </select>
                            <div>Region</div>
                            <select className="rounded small--dd" onChange={handleSelectChange} value={option}>
                                <option value={0}>All</option>
                                {
                                    brewMethods.map( b => <option value={b.id} > {b.method}</option>)
                                }
                            </select>
                        </div>
                        
                        <div className="row">
                            <div>Keywords</div>
                            <input className="rounded" type='text' placeholder="Search..." onChange={evt => setSearch(evt.target.value)}/>
                        </div>
                    </div>
                    </div>
                </div>

            <div className="title--pair">

               


            
                    <div> {reverse ? "Newest" : "Oldest"}</div>
                    <div>
                         
                        <select className="EC--sortDD rounded" onChange={handleSortChange}  >
                            <option value="1">newest</option>
                            <option value="2">oldest</option>
                        </select>
                    </div>
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
        </section>
    )
}

