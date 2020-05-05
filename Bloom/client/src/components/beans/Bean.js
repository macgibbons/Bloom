import React from "react"
import { Link } from "react-router-dom"


export default ({bean}) => (
    <section className="">

        <div className="">
            <h3 className="">
                <Link  className="" to={`/Coffee/${bean.id}`}>
                    { bean.beanName }
                </Link>
                <div className="">
                    
                    { bean.roaster }
                </div>
            </h3>
        </div>


        
    </section>
)


