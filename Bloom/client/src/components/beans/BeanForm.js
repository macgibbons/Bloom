import React, { useContext, useState, useEffect } from "react"
import { BeanContext } from "./BeanProvider";
import { getUser } from "../../API/userManager";
import { RegionContext } from "../regions/RegionProvider";
import DateTime from "react-datetime";
import moment from "moment";
import StarRating from "../StarRating";
export default props => {
    
    const { addBean, beans, updateBean, deleteBean} = useContext(BeanContext)
    const { regions } = useContext(RegionContext)
    const [bean, setBean] = useState({})
    const [selectedDate, setSelectedDate] = useState()
    const [rating, setRating] = useState(0)
    const [error, setError] = useState("")
    const [date, setDate ] = useState(bean.roastDate)
    
    const editMode = props.match.params.hasOwnProperty("beanId")
    const user = getUser();
   
    

    if(user !== null) {
        document.body.classList.add("user--loggedIn")
    }

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newBean = Object.assign({}, bean)
        newBean[event.target.name] = event.target.value
        setBean(newBean)
    }

    const setDefaults = () => {
        if (editMode) {
            const beanId = parseInt(props.match.params.beanId)
            const selectedBean = beans.find(b => b.id === beanId) || {}
            setBean(selectedBean)
        }
    }
    
    
    useEffect(() => {
        setDefaults()
    }, [beans])


    const deleteButton = (
        <>
            <div className="btn delete--btn"
            onClick={() => {
                deleteBean(bean.id)
                    .then(() => {
                        props.history.push("/coffee")
                    })
                }}>
                <div>delete</div>
            </div>
        </>
    )

   
    const constructNewBean = () => {
        if (bean.beanName === undefined) {
            setError("Please specify a Coffee")
        } else if (bean.roastLevel === undefined) {
            setError("Please specify a roast level")
        } else if (bean.regionId === undefined) {
            setError("Please specify a region")
        } else  if (bean.roaster === undefined) {
            setError("Please specify a roaster")
        }  //else if (selectedDate || date === undefined) {
           // setError("Please specify a roast date")
      //  } 
        else {

            if (editMode) {
                debugger
                updateBean(
                    {
                    
                    id: bean.id,
                    beanName: bean.beanName,
                    roastLevel: bean.roastLevel,
                    masl: bean.masl,
                    roastDate: selectedDate === undefined ?  bean.roastDate : selectedDate,
                    quantity:parseInt(bean.quantity),
                    rating: rating ? rating : 0,
                    tastingNotes: bean.tastingNotes,
                    variety: bean.variety,
                    process: bean.process,
                    notes: bean.notes ? bean.notes : "",
                    origin: bean.origin,
                    roaster: bean.roaster,
                    regionId: parseInt(bean.regionId),
                    userId: user.id
                })
                    .then(() => props.history.push("/coffee"))
            } else {
              
                addBean({
                    id: bean.id,
                    beanName: bean.beanName,
                    roastLevel: bean.roastLevel,
                    masl: bean.masl ? bean.masl : "",
                    roastDate:  moment(selectedDate).format(),
                    quantity: bean.quantity ? parseInt(bean.quantity) : 340, 
                    rating: rating ? rating : 0,
                    tastingNotes: bean.tastingNotes ? bean.tastingNotes : "",
                    variety: bean.variety ? bean.variety : "",
                    process: bean.process ? bean.process : "",
                    notes: bean.notes ? bean.notes : "",
                    origin: bean.origin ? bean.origin : "",
                    roaster: bean.roaster,
                    regionId: parseInt(bean.regionId),
                    userId: user.id
                })
                    .then(() => props.history.push("/coffee"))
            }
        }
        
    }

    return (
        <div className="coffee--view">
        <form className="form container">
        <div className="center">{editMode ? "Update Coffee" : "New Coffee"}</div>
            <div className= {error === "" ? "hidden" : "error"}>{error}</div>
            <div className="btn delete--btn">{editMode ? deleteButton : ""} </div>
            <div className="wrapper">
        

                <fieldset className="center">
                    <div className="center room-form-group">
                        {/* <label htmlFor="beanName">Name</label> */}
                        <input type="text" name="beanName" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="Name.."
                            defaultValue={bean.beanName}
                            onChange={handleControlledInputChange}
                            />
                    </div>
                    </fieldset>
            <StarRating className="rating--form center" {...props} 
                    selectedRating={setRating} 
                    editMode={editMode ? true : false }
                    editRating={ editMode ? bean.rating : null } />
        

<div className="form--pair">
<fieldset>

                    <div className="center  room-form-group">
                        <label htmlFor="roastDate">Roast Date</label>
                        <input type="date" onChange={(evt)=>setSelectedDate(moment(evt.target.value).format())} />
                        {/* <DateTime  className="date--picker" selected={selectedDate} defaultValue={date}
                                  onChange={date => setSelectedDate(date) }
                        />
                        */}

                    </div>
</fieldset>

                <fieldset>
                    <div className="room-form-group">
                        {/* <label htmlFor="origin">Origin</label> */}
                        <input type="text" name="origin" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="Origin.."
                            defaultValue={bean.origin}
                            onChange={handleControlledInputChange}
                            />
                    </div>
                </fieldset>
</div>
<div className="form--pair">

                <fieldset>
                    <div className="room-form-group">
                        {/* <label htmlFor="roaster">roaster</label> */}
                        <input type="text" name="roaster" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="roaster.."
                            defaultValue={bean.roaster}
                            onChange={handleControlledInputChange}
                            />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="room-form-group">
                        {/* <label htmlFor="tastingNotes">Tasting Notes</label> */}
                        <input type="text" name="tastingNotes" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="Tasting Notes.."
                            defaultValue={bean.tastingNotes}
                            onChange={handleControlledInputChange}
                            />
                    </div>
                </fieldset>
</div>
<div className="form--pair">

                <fieldset>
                    <div className="room-form-group">
                        {/* <label htmlFor="variety">variety</label> */}
                        <input type="text" name="variety" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="variety.."
                            defaultValue={bean.variety}
                            onChange={handleControlledInputChange}
                            />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="room-form-group">
                        {/* <label htmlFor="process">process</label> */}
                        <input type="text" name="process" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="process.."
                            defaultValue={bean.process}
                            onChange={handleControlledInputChange}
                            />
                    </div>
                </fieldset>
</div>

            <div className="form--pair">

                <fieldset>
                    <div className="room-form-group">
                        {/* <label htmlFor="masl">MASL</label> */}
                        <input type="text" name="masl" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="masl.."
                            defaultValue={bean.masl}
                            onChange={handleControlledInputChange}
                            />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="room-form-group">
                        {/* <label htmlFor="roastLevel">Roast</label> */}
                        <input type="text" name="roastLevel" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="roast Level.."
                            defaultValue={bean.roastLevel}
                            onChange={handleControlledInputChange}
                            />
                    </div>
                </fieldset>

                 </div>
                 <div className="form--pair">

                    <fieldset>
                        <div className="plant-water-pair">
                            <div className="form-group water">
                                {/* <label htmlFor="Quantity">Quantity</label> */}
                                <input type="int" name="quantity" placeholder="Quantity..." className="form-control-type1"
                                    proptype="int"
                                    
                                    value={bean.quantity}
                                    onChange={handleControlledInputChange}/>
                                    
                            </div>
                            <div className="cups">g</div>
                        </div>
                    </fieldset>
                
                    <fieldset>
                        <div className="form-group">
                            {/* <label htmlFor="roomId">room: </label> */}
                            <select name="regionId" className="form-control-type1"
                                proptype="int"
                                value={bean.regionId}
                                onChange={handleControlledInputChange}>

                                <option value="0" >region</option>
                                {regions.map(r => (
                                    <option key={r.id} value={r.id}>
                                        {r.regionName}
                                    </option>
                                ))}
                            
                            </select>
                        </div>
                    </fieldset>
                 </div>

                <fieldset>
                <div className="form-group">
                    {/* <label htmlFor="notes">Notes: </label> */}
                    <textarea rows="5" cols="50" type="text" name="notes" className="form-control-type1"
                        proptype="varchar"
                        placeholder="notes..."
                        value={bean.notes}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </fieldset>

            </div>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewBean()
                }}
                className="btn btn-primary roomBtn">
                {editMode ? "Save Updates" : "Add Coffee"}
            </button>
           
        </form>
        </div>
    )
}

