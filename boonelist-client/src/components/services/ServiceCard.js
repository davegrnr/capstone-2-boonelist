import React from 'react';
import { Link } from 'react-router-dom'

function ServiceCard({id, title, pay, serviceInfo, postedBy, createdAt}) {

    return(
        <Link className="ServiceCard card" to={`/services/${id}`}>
            <div className="card-body">
                <h5 className="card-title">
                    {title}
                </h5>
                <p>{pay}</p>
                <p>{serviceInfo}</p>
                <p>{postedBy}</p>
                <p>Posted :{createdAt}</p>

            </div>
        </Link>
    )
}

export default ServiceCard;