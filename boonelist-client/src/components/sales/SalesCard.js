import React from 'react';
import { Link } from 'react-router-dom'
import './SalesCard.css'

function SalesCard({id, name, price, info, postedBy, createdAt, handleDate}) {

    return(
        <div className="SalesCard card card mb-2 mt-4" to={`/sales/${id}`}>
            <div className="card-body">
                <Link to={`/sales/${id}`}>
                    <h5>
                        {name}
                    </h5>
                </Link>
                <p>${price}</p>
                <p>Posted: {handleDate(createdAt)}</p>

            </div>
        </div>
    )
}

export default SalesCard;