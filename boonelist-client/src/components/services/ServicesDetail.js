import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import BoonelistApi from '../../api/api'
import LoadingSpinner from '../../common/LoadingSpinner'

/** Service Detail page
 * 
 * Renders information about a service
 * 
 * Routed at /service/:id
 * 
 * Routes -> ServiceDetail
 * 
 * TODO: Add comment and like feature
 */

function ServicesDetail() {
    const { id } = useParams()

    const [service, setService] = useState(null)

    useEffect(function getServiceById() {
        async function getService(){
            setService(await BoonelistApi.getService(id))
        }

        getService();
    }, [id]);

    if(!service) return <LoadingSpinner />

    return (
        <div className="ServicesDetail">
            <Link to="/services">Back to All Services</Link>
            <hr />
            <h1>{service.title}</h1>
            <h3>${service.pay}</h3>
            <p>{service.serviceInfo}</p>

        </div>
    )
}

export default ServicesDetail;