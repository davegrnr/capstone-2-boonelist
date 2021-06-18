import React from 'react';
import { Link } from 'react-router-dom'
import './ServiceCard.css'

function ServiceCard({id, title, pay, serviceInfo, postedBy, createdAt, handleDate}) {

    return(

            <div className="ServiceCard card mb-2 mt-4">
                <div className="card-body">
                    <Link to={`/services/${id}`}>
                        <h5>
                            {title}
                        </h5>
                    </Link>
                    <p>${pay}</p>
                    <p>Posted: {handleDate(createdAt)}</p>
                </div>
            </div>

    )
}

export default ServiceCard;