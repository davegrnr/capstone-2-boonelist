
import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import BoonelistApi from '../../api/api'
import LoadingSpinner from '../../common/LoadingSpinner'
import './SalesDetail.css'

/** Sale Detail page
 * 
 * Renders information about a sale
 * 
 * Routed at /sale/:id
 * 
 * Routes -> SaleDetail
 * 
 * TODO: Add comment and like feature
 */

function SalesDetail() {
    const { id } = useParams()

    const [sale, setSale] = useState(null)

    useEffect(function getSaleById() {
        async function getSale(){
            setSale(await BoonelistApi.getSale(id))
        }

        getSale();
    }, [id]);

    if(!sale) return <LoadingSpinner />

    return (
        <div className="SaleDetail">
            <div>
                <h1>{sale.itemName}</h1>
                <h3>${sale.price}</h3>
                <p>{sale.itemInfo}</p>
            </div>
            <hr />
            <button className="btn btn-primary"><Link to="/sales" className="sales-link" style={{textDecoration: 'none'}}>Back to All Sales</Link></button>
        </div>

    )
}

export default SalesDetail;