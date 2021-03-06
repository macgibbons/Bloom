import React, { useContext, useState, useEffect } from "react"
import { BrewContext } from "../../brews/BrewProvider";
import { getUser } from "../../../API/userManager";
import { BrewMethodContext } from "../../equiptment/brewMethods/BrewMethodProvider";
import SharedBrew from "../SharedBrew";
import EmptyState from "../../EmptyState";
import '../Explore.css'
import { FollowContext } from "./FollowProvider";


export default (props) => {

    // ***** CONTEXT *****
    const { brews } = useContext(BrewContext)
    const { brewMethods } = useContext(BrewMethodContext)
    const { follows } = useContext(FollowContext)

    // ***** STATE *****
    const [option, setOption] = useState("0")
    const [search, setSearch] = useState("")
    const [ reverse, setReverse ] = useState(true)

    // ***** USER *****
    const user = getUser()

    if(user !== null) {
        document.body.classList.add("user--loggedIn")
    }


    var moment = require('moment')
    // ***** Filters *****
    
    const userFollows = follows.filter(f => f.userId === user.id)
    const sharedBrews = brews.filter(b => b.shared === true)
    let followedBrews = []
    userFollows.map(f => 
        sharedBrews.filter(
            (b) =>{ if(b.userId === f.folllowId) followedBrews.push(b)})
            )

    const sortedBrews = reverse ? followedBrews.sort((a, b) => moment(b.brewDate) - moment(a.brewDate)) : followedBrews.sort((a, b) => moment(b.brewDate) - moment(a.brewDate)).reverse()
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

                <div className="page--title">whats new...</div> 
                {/* <div className="header--filters">
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
                    </div> */}
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
                        sortedBrews.map(brew => {
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

