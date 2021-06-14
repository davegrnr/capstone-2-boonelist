import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import UserContext from '../../auth/UserContext'
import BoonelistApi from '../../api/api'
import LoadingSpinner from '../../common/LoadingSpinner'
import NewCommentForm from '../comment/NewCommentForm';
import './ServicesDetail.css'

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
    const {currentUser} = useContext(UserContext)
    const route = 'services'

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
            <div>
                <h1>{service.title}</h1>
                <h3>${service.pay}</h3>
                <p>{service.serviceInfo}</p>
                <p>Path: {route}</p>
                <p>ID : {id}</p>
                <p>User: {currentUser.username}</p>
            </div>
            <hr />
            <div className="comments">
                <p>Comments</p>
            </div>
            <div className="comment-form">
                <NewCommentForm  
                                username={currentUser.username}
                                subjectId={id}
                />
            </div>
            <button className="btn btn-primary"><Link to="/services" className="services-link" style={{textDecoration: 'none'}}>Back to All Services</Link></button>
        </div>
    )
}

export default ServicesDetail;