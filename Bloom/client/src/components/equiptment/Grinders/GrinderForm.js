import React, { useContext, useState, useEffect } from "react"
import { GrinderContext } from "./GrinderProvider";
import { getUser } from "../../../API/userManager";

export default props => {
    const { addGrinder, grinders, updateGrinder, deleteGrinder} = useContext(GrinderContext)
    const [grinder, setGrinder] = useState({})
    const [hide, setHide ] = useState(true)
    const [error, setError] = useState("")

    

    const editMode = props.grinderId >=1
    const user = getUser();
   

    if(user !== null) {
        document.body.classList.add("user--loggedIn")
    }

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newGrinder = Object.assign({}, grinder)
        newGrinder[event.target.name] = event.target.value
        setGrinder(newGrinder)
    }

    
    const functionHandler = (hide) => {
        
        props.isFormShowing(hide)
        
    } 
           
      
    

        
   
    const setDefaults = () => {
        if (editMode) {
            const grinderId = props.grinderId
            const selectedGrinder = grinders.find(g => g.id === grinderId) || {}
            setGrinder(selectedGrinder)
        }
    }

    useEffect(() => {
        setDefaults()
    }, [grinders])

    useEffect(() => {
        functionHandler(hide)
    }, [hide])

    
    const deleteButton = (
        <>
            <div className="btn delete--btn"
            onClick={() => {
                deleteGrinder(grinder.id)
                  
                }}>
                <div>delete</div>
            </div>
        </>
    )
    
    const constructNewGrinder = () => {
        if (grinder.brand === undefined ){
            setError("Please define a grinder brand")
        } else if (grinder.model === undefined){
            setError("Please define a grinder model")

        } else {

            if (editMode) {
                updateGrinder({
                    id: grinder.id,
                    brand: grinder.brand,
                    model: grinder.model,
                    userId: user.id
                }).then(()=> { setHide(false)})
                    
            } else {
                addGrinder({
                    id: grinder.id,
                    brand: grinder.brand,
                    model: grinder.model,
                    userId: user.id
                }).then(()=> { setHide(false)})
                   
            }
        }
        
    }

    return (
        <form className="grinder--form container">
            <h2 className="formTitle  detail--header">{editMode ? "Update Grinder" : "New Grinder"}</h2>
            {/* <div className="btn delete--btn">{editMode ? deleteButton : ""} </div> */}
            <div className="wrapper">
            <div className= {error === "" ? "hidden" : "error"}>{error}</div>
                <fieldset>
                    <div className="room-form-group">
                        {/* <label htmlFor="brand">Brand </label> */}
                        <input type="text" name="brand" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="Brand..."
                            defaultValue={grinder.brand}
                            onChange={handleControlledInputChange}
                            />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="room-form-group">
                        {/* <label htmlFor="model">Model* </label> */}
                        <input type="text" name="model" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="Model.."
                            defaultValue={grinder.model}
                            onChange={handleControlledInputChange}
                            />
                    </div>
                </fieldset>
            </div>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewGrinder()
                   
                }}
                className="btn add--btn">
                {editMode ? <div className="center">Save Updates</div> : <div className="center">Add Grinder</div>}
            </button>
           
        </form>
    )
}

