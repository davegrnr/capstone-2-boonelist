import React from 'react';
import { Link } from 'react-router-dom'

function SalesCard({id, name, price, info, postedBy, createdAt}) {

    return(
        <Link className="SalesCard card" to={`/sales/${id}`}>
            <div className="card-body">
                <h5 className="card-title">
                    {name}
                </h5>
                <p>{price}</p>
                <p>{info}</p>
                <p>{postedBy}</p>

            </div>
        </Link>
    )
}

export default SalesCard;