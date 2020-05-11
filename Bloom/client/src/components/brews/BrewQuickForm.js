import React, { useContext, useState, useEffect } from "react"
import { getUser } from "../../API/userManager";
import moment from "moment";
import { BrewContext } from "./BrewProvider";
import { BrewMethodContext } from "../equiptment/brewMethods/BrewMethodProvider";
import { BeanContext } from "../beans/BeanProvider";
import { GrinderContext } from "../equiptment/Grinders/GrinderProvider";
import { useTimer } from "use-timer";
import RunningButton from "../RunningButton";

export default props => {
    const user = getUser();

    // ----- CONTEXT -----
    const { addBrew, brews } = useContext(BrewContext)
    const { brewMethods } = useContext(BrewMethodContext) || {}
    const { beans } = useContext(BeanContext) || {}
    const { grinders } = useContext(GrinderContext) || {}


    // ----- User Data -----
    const userGrinders =  grinders.filter(grinder => grinder.userId == user.id)
    const userBeans =  beans.filter(bean => bean.userId == user.id)

    // ----- Other -----
    const { time, start, pause, reset, isRunning } = useTimer({initialTime: 0});

    // ----- State -----
    const [brew, setBrew] = useState({})
    const [brewTime, setBrewTime] = useState(time)
    const [error, setError] = useState("")
    
    const editMode = props.match.params.hasOwnProperty("brewId")
    const quickMode = props.match.params.hasOwnProperty("brewMethodId")

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
        if (quickMode) {
            const brewMethodId = parseInt(props.match.params.brewMethodId)
            const selectedBrewMethod = brewMethods.find(b => b.id === brewMethodId) || {}
            setBrew(selectedBrewMethod)
        }
    }
   
    const updateBrewTime = () => {
      const newTime = time
        setBrewTime(newTime)
    }
    
    useEffect(() => {
        setDefaults()
    }, [brews])


   
    const constructNewBrew = () => {
  
            if (brew.waterDose === undefined) {
                setError("Please specify water amount")
            } else if (brew.coffeeDose === undefined) {
                setError("Please specify coffee amount")
            } else if (brew.brewTime === undefined) {
                setError("Please specify a brew time")
            } else  if (brew.grinderId === undefined) {
                setError("Please specify a Grinder")
            }  else if (brew.beanId === undefined){
                setError("Please specify a coffee")
            } else {
                const brewTime = moment.duration(brew.brewTime, 'm:ss').asSeconds() / 60

                
                    addBrew({
                        id: brew.id,
                        coffeeDose: parseInt(brew.coffeeDose),
                        waterDose: parseInt(brew.waterDose),
                        waterTemp: 212,
                        brewTime: brewTime, //moment.duration('0:30', 'm:ss').asSeconds() / 60
                        rating:  0,
                        notes:  "",
                        brewDate: moment().format(),
                        grindSetting:  0,
                        grinderId: parseInt(brew.grinderId),
                        brewMethodId: parseInt(brew.id),
                        beanId: parseInt(brew.beanId),
                        userId: user.id
                    })
                        .then(() => props.history.push("/brews"))
                
            }
        
    }

    return (
      
        <form className="form container">
            <h2 className="formTitle">{ `New ${brew.method} Brew` }</h2>
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
    
                <fieldset>
                    <div className="room-form-group">
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
                Add Brew
            </button>
           
        </form>
    )
}

