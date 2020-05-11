import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { BeanContext } from "./BeanProvider"


export default ({bean, history }) => {
    const { deleteBean } = useContext(BeanContext)
    const deleteConfirm = () => {
        if(window.confirm(`Are you sure you want to delete this brew? This action cannot be undone`))
          {deleteBean(bean.id)
          }}
    return(
    <section className="">

        <div className="coffee--card">
            <div className="coffee--title">
                <Link  className="card--link" to={`/Coffee/${bean.id}`}>
                    { bean.beanName }
                </Link>
            </div>
            <div className="coffee--content">
                <div className="">
                    { bean.roaster }
                </div>
                <div>
                    { bean.origin}
                </div>
                <div>
                    { bean.tastingNotes}
                </div>

            </div>
            <div className="card--controls">
                <div className="card--control"
                    onClick={()=>{ deleteConfirm() }
                    }>delete</div>
                <div className="card--control"
                   onClick={() => {
                    history.push(`/coffee/edit/${bean.id}`)
                }} >edit</div>
            </div>
        </div>


        
    </section>
)
            }

