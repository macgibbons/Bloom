import React from "react"
import { Link } from "react-router-dom"


export default ({bean}) => (
    <section className="">

        <div className="coffee--card">
            <h3 className="">
                <Link  className="" to={`/Coffee/${bean.id}`}>
                    { bean.beanName }
                </Link>
            </h3>
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
        </div>


        
    </section>
)


