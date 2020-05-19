import React, { useContext, useState, useEffect } from "react"
import { BeanContext } from "./BeanProvider";
import { getUser } from "../../API/userManager";
import { RegionContext } from "../regions/RegionProvider";
import moment from "moment";
import StarRating from "../StarRating";
export default props => {
    
    const { addBean, beans, updateBean, deleteBean} = useContext(BeanContext)
    const { regions } = useContext(RegionContext)
    const [bean, setBean] = useState({})
    const [selectedDate, setSelectedDate] = useState()
    const [rating, setRating] = useState(0)
    const [error, setError] = useState("")
    
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
            <div className="btn add--btn "
            onClick={() => {
                deleteBean(bean.id)
                    .then(() => {
                        props.history.push("/coffee")
                    })
                }}>
                <div className="center">delete</div>
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
        }  
        else {

            if (editMode) {
                
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

        <div className="center form--title">{editMode ? "Update Coffee" : "New Coffee"}</div>
        <div className= {error === "" ? "hidden" : "error"}>{error}</div>
        <div className="">{editMode ? deleteButton : ""} </div>

        <div className="wrapper">

            <fieldset className="center">
                <div className="center ">
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
                    <div className="center">
                        <label className="form--label" htmlFor="roastDate">Roast Date</label>
                        <input type="date" onChange={(evt)=>setSelectedDate(moment(evt.target.value).format())} />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="column">
                        <label  className="form--label" htmlFor="origin">Origin</label>
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
                    <div className="column">
                        <label className="form--label" htmlFor="roaster">Roaster</label>
                        <input type="text" name="roaster" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="Onyx, Sump, Verve..."
                            defaultValue={bean.roaster}
                            onChange={handleControlledInputChange}
                            />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="column">
                        <label className="form--label" htmlFor="tastingNotes">Tasting Notes</label>
                        <input type="text" name="tastingNotes" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="Floral, juicy, bright..."
                            defaultValue={bean.tastingNotes}
                            onChange={handleControlledInputChange}
                            />
                    </div>
                </fieldset>

            </div>

            <div className="form--pair">

                <fieldset>
                    <div className="column">
                        <label className="form--label" htmlFor="variety">Varietal</label>
                        <input type="text" name="variety" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="Typica, caturra, SL-88..."
                            defaultValue={bean.variety}
                            onChange={handleControlledInputChange}
                            />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="column">
                        <label className="form--label" htmlFor="process">Process</label>
                        <input type="text" name="process" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="Washed, natural, honey..."
                            defaultValue={bean.process}
                            onChange={handleControlledInputChange}
                            />
                    </div>
                </fieldset>

            </div>

            <div className="form--pair">

                <fieldset>
                    <div className="column">
                        <label className="form--label" htmlFor="masl">Altitude</label>
                        <input type="text" name="masl" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="1200m.."
                            defaultValue={bean.masl}
                            onChange={handleControlledInputChange}
                            />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="column">
                        <label className="form--label" htmlFor="roastLevel">Roast</label>
                        <input type="text" name="roastLevel" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="Light, medium, dark..."
                            defaultValue={bean.roastLevel}
                            onChange={handleControlledInputChange}
                            />
                    </div>
                </fieldset>

            </div>

            <div className="form--pair">

                <fieldset>
                    <div className="column">
                        <label className="form--label" htmlFor="Quantity">Quantity(g)</label>
                        <div className="row align-baseline">

                            <input type="int" name="quantity" placeholder="Quantity..." className="form-control-type1"
                                proptype="int"
                                
                                value={bean.quantity}
                                onChange={handleControlledInputChange}/>
                            <div className="">g</div>
                                
                        </div>
                    </div>
                </fieldset>
        
                <fieldset>
                    <div className="form-group column">
                        <label className="form--label" htmlFor="regionId">Region</label>
                        <select name="regionId" className="form-control-type1"
                            proptype="int"
                            value={bean.regionId}
                            onChange={handleControlledInputChange}>

                            <option value="0" >Region</option>
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
                <div className="column form-group">
                    <label className="form--label" htmlFor="notes">Notes: </label>
                    <textarea rows="5" cols="50" type="text" name="notes" className="form-control-type1"
                        proptype="varchar"
                        placeholder="Notes..."
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
            className="btn center  add--btn ">
            {editMode ? <div className="center">Save Updates</div>: <div className="center">Add Coffee</div>}
        </button>
            
    </form>
</div>
    )
}

