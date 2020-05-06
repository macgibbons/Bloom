import React, { useContext, useState, useEffect } from "react"
import { GrinderContext } from "./GrinderProvider";
import { getUser } from "../../../API/userManager";

export default props => {
    const { addGrinder, grinders, updateGrinder, deleteGrinder} = useContext(GrinderContext)
    const [grinder, setGrinder] = useState({})

    
    const editMode = props.match.params.hasOwnProperty("grinderId")
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

    const setDefaults = () => {
        if (editMode) {
            const grinderId = parseInt(props.match.params.grinderId)
            const selectedGrinder = grinders.find(g => g.id === grinderId) || {}
            setGrinder(selectedGrinder)
        }
    }

    useEffect(() => {
        setDefaults()
    }, [grinders])

    const deleteButton = (
        <>
            <div className="btn delete--btn"
            onClick={() => {
                deleteGrinder(grinder.id)
                    .then(() => {
                        props.history.push("/equiptment")
                    })
                }}>
                <div>delete</div>
            </div>
        </>
    )
    
    const constructNewGrinder = () => {

            if (editMode) {
                updateGrinder({
                    id: grinder.id,
                    brand: grinder.brand,
                    model: grinder.model,
                    userId: user.id
                })
                    .then(() => props.history.push("/equiptment"))
            } else {
                addGrinder({
                    id: grinder.id,
                    brand: grinder.brand,
                    model: grinder.model,
                    userId: user.id
                })
                    .then(() => props.history.push("/equiptment"))
            }
        
    }

    return (
        <form className="form container">
            <h2 className="formTitle  detail--header">{editMode ? "Update Grinder" : "New Grinder"}</h2>
            <div className="btn delete--btn">{editMode ? deleteButton : ""} </div>
            <div className="wrapper">
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
                className="btn btn-primary roomBtn">
                {editMode ? "Save Updates" : "Add Grinder"}
            </button>
           
        </form>
    )
}

