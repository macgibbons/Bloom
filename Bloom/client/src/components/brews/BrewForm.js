import React, { useContext, useState, useEffect } from "react"
import { getUser } from "../../API/userManager";
import DateTime from "react-datetime";
import moment from "moment";
import { BrewContext } from "./BrewProvider";
import { BrewMethodContext } from "../equiptment/brewMethods/BrewMethodProvider";
import { BeanContext } from "../beans/BeanProvider";
import { GrinderContext } from "../equiptment/Grinders/GrinderProvider";
import { useTimer } from "use-timer";
import RunningButton from "../RunningButton";
import StarRating from "../StarRating";

export default props => {
    const user = getUser();

    // ----- CONTEXT -----
    const { addBrew, brews, updateBrew, deleteBrew } = useContext(BrewContext)
    const { brewMethods } = useContext(BrewMethodContext) || {}
    const { beans } = useContext(BeanContext) || {}
    const { grinders } = useContext(GrinderContext) || {}


    // ----- User Data -----
    const userGrinders =  grinders.filter(grinder => grinder.userId == user.id)
    const userBeans =  beans.filter(bean => bean.userId == user.id)

    // ----- Other -----
    const { time, start, pause, reset, isRunning } = useTimer({initialTime: -3});
    const [rating, setRating] = useState("");

    // ----- State -----
    const [brew, setBrew] = useState({})
    const [brewTime, setBrewTime] = useState(time)
    const [error, setError] = useState("")
    
    const editMode = props.match.params.hasOwnProperty("brewId")
    const quickMode = props.match.params.hasOwnProperty("brewMethodId")
    console.log(props)

    if(user !== null) {
        document.body.classList.add("user--loggedIn")
    }

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newBrew = Object.assign({}, brew)
        newBrew[event.target.name] = event.target.value
        setBrew(newBrew)
    }

    const setDefaults = () => {
        if (editMode) {
            const brewId = parseInt(props.match.params.brewId)
            const selectedBrew = brews.find(b => b.id === brewId) || {}
            setBrew(selectedBrew)
        }
    }
   
    const updateBrewTime = () => {
      const newTime = time
        setBrewTime(newTime)
    }
    
    useEffect(() => {
        setDefaults()
    }, [brews])

    const deleteButton = (
        <>
            <div className="btn delete--btn"
            onClick={() => {
                deleteBrew(brew.id)
                    .then(() => {
                        props.history.push("/coffee")
                    })
                }}>
                <div>delete</div>
            </div>
        </>
    )

    if(quickMode === true){
        console.log("you are in quick mode")
    }
   
    const constructNewBrew = () => {
  
            if (brew.waterDose === undefined) {
                setError("Please specify water amount")
            } else if (brew.coffeeDose === undefined) {
                setError("Please specify coffee amount")
            } else if (brew.brewTime === undefined) {
                setError("Please specify a brew time")
            } else  if (brew.grinderId === undefined) {
                setError("Please specify a Grinder")
            } else if (brew.brewMethodId === undefined){
                setError("Please Specify a brew method")
            } else if (brew.beanId === undefined){
                setError("Please specify a coffee")
            } else {
                const brewTime = moment.duration(brew.brewTime, 'm:ss').asSeconds() / 60

                if (editMode) {

                    updateBrew({
                        id: brew.id,
                        coffeeDose: parseInt(brew.coffeeDose),
                        waterDose: parseInt(brew.waterDose),
                        waterTemp: parseInt(brew.waterTemp),
                        brewTime: moment.duration(brew.brewTime, 'm:ss').asSeconds() / 60,
                        rating: rating ? rating : 0,
                        notes: brew.notes ? brew.notes : "",
                        brewDate: moment().format(),
                        grindSetting: parseInt(brew.grindSetting),
                        grinderId: parseInt(brew.grinderId),
                        brewMethodId: parseInt(brew.brewMethodId),
                        beanId: parseInt(brew.beanId),
                        userId: user.id
                    })
                        .then(() => props.history.push("/brews"))
                } else {
                debugger
                    addBrew({
                        id: brew.id,
                        coffeeDose: parseInt(brew.coffeeDose),
                        waterDose: parseInt(brew.waterDose),
                        waterTemp: brew.waterTemp === undefined ? 212 : parseInt(brew.waterTemp),
                        brewTime: brewTime, //moment.duration('0:30', 'm:ss').asSeconds() / 60
                        rating: rating ? rating : 0,
                        notes: brew.notes ? brew.notes : "",
                        brewDate: moment().format(),
                        grindSetting: brew.grindSetting === undefined ? 0 : parseInt(brew.grindSetting),
                        grinderId: parseInt(brew.grinderId),
                        brewMethodId: parseInt(brew.brewMethodId),
                        beanId: parseInt(brew.beanId),
                        userId: user.id
                    })
                        .then(() => props.history.push("/brews"))
                }
            }
        
    }

    return (
      
        <form className="form container">
            <h2 className="formTitle">{editMode ? "Update brew" : "New brew"}</h2>
            <div className="btn delete--btn">{editMode ? deleteButton : ""} </div>
            <div className= {error === "" ? "hidden" : "error"}>{error}</div>
            <div className="timer">{editMode ?  "" :
            <>
                <div className="timer-time">
                    <h1> {time < 0 ? time : moment.utc(time * 1000).format('m:ss')}</h1>
                </div>
                <div className="card-body">
                    {isRunning ? (
                        <RunningButton />
                    
                    ) : (
                        <button className="btn btn-primary" onClick={start}>
                        Brew
                    </button>
                    )}
                    <button className="btn btn-primary" 
                            onClick={pause}
                            >
                    Stop
                    </button>
                    <button className="btn btn-primary" 
                            onClick={reset}
                        >
                    Reset
                    </button>
                    <button className="btn btn-primary" 
                            onClick={evt => {
                                evt.preventDefault()
                                updateBrewTime()
                            }}>
                    Use Brew time
                    </button>
                </div>
                </>
             }
                </div>
            <div className="wrapper">
                <StarRating className="rating--form" {...props} 
                    selectedRating={setRating} 
                    editMode={editMode ? true : false }
                    editRating={ editMode ? brew.rating : null } />
                <fieldset>
                    <div className="room-form-group">
                        {/* <label htmlFor="coffeeDose">Coffee Dose:</label> */}
                        <input type="number" step="0.1" name="coffeeDose" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="Dose..."
                            defaultValue={brew.coffeeDose}
                            onChange={handleControlledInputChange}
                            /> g
                    </div>
                </fieldset>

                <fieldset>
                    <div className="room-form-group">
                        {/* <label htmlFor="waterDose">Water Amount: </label> */}
                        <input type="number"  name="waterDose" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="Water..."
                            defaultValue={brew.waterDose}
                            onChange={handleControlledInputChange}
                            /> g
                    </div>
                </fieldset>

                <fieldset>
                    <div className="room-form-group">
                        {/* <label htmlFor="waterTemp">Water Temp: </label> */}
                        <input type="number"  name="waterTemp" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="Temp.."
                            defaultValue={brew.waterTemp}
                            onChange={handleControlledInputChange}
                            /> 
                           °F
                    </div>
                </fieldset>

                <fieldset>
                    <div className="room-form-group">
                        <label htmlFor="brewTime">Brew Time:</label>
                        <input type="text"  name="brewTime" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="seconds..."
                            Value={ editMode ? moment.utc(brew.brewTime * 1000).format('m:ss') :
                                brewTime < 0 ? '0:00' : moment.utc(brewTime * 1000).format('m:ss')}
                            onChange={handleControlledInputChange}
                            /> 
                    </div>
                </fieldset>


                <fieldset>
                    <div className="room-form-group">
                        <input type="number"  name="grindSetting" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="Grind setting..."
                            value={brew.grindSetting}
                            onChange={handleControlledInputChange}
                            /> 
                    </div>
                </fieldset> 

                <fieldset>
                    <div className="form-group">
                        {/* <label htmlFor="notes">Notes: </label> */}
                        <textarea type="text" name="notes" className="form-control-type1"
                            proptype="varchar"
                            placeholder="Notes..."
                            value={brew.notes}
                            onChange={handleControlledInputChange}>
                        </textarea>
                    </div>
                </fieldset>

                         
                <fieldset>
                    <div className="form-group">
                        <select name="brewMethodId" className="form-control-type1"
                            proptype="int"
                            value={brew.brewMethodId}
                            onChange={handleControlledInputChange}>

                            <option value="0" disabled>Select a Brew Method:</option>

                            {brewMethods.map(g => (
                                <option key={g.id} value={g.id}>
                                    { g.method } 
                                </option>
                            ))}
                        
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select name="grinderId" className="form-control-type1"
                            proptype="int"
                            value={brew.grinderId}
                            onChange={handleControlledInputChange}>

                            <option value="0">Select a Grinder:</option>

                            {userGrinders.map(g => (
                                <option key={g.id} value={g.id}>
                                    { g.brand } { g.model }
                                </option>
                            ))}
                        
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select name="beanId" className="form-control-type1"
                            proptype="int"
                            value={brew.beanId}
                            onChange={handleControlledInputChange}>

                            <option value="0">Select a Coffee:</option>

                            {userBeans.map(g => (
                                <option key={g.id} value={g.id}>
                                    { g.beanName } -- { g.roaster }
                                </option>
                            ))}
                        
                        </select>
                    </div>
                </fieldset>
               
            </div>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewBrew()
                }}
                className="btn btn-primary roomBtn">
                {editMode ? "Save Updates" : "Add Brew"}
            </button>
           
        </form>
    )
}

