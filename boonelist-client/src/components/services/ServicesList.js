import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BoonelistApi from '../../api/api'
import ServiceCard from './ServiceCard'
import LoadingSpinner from '../../common/LoadingSpinner'

function ServicesList() {
    const [services, setServices] = useState()

    useEffect(function getAllServicesOnMount(){
        search();
    }, [])

    async function search(title){
        let services = await BoonelistApi.getServices(title)
        setServices(services);
    }


    if(!services) return <LoadingSpinner />

    return (
        <div className="ServicesList">
            <h1>Services</h1>
            <div className="NewServiceForm-link">
                <Link to="/services/new">Post New Service</Link>
            </div>
            {services.length
            ? (
                
                <div className="ServicesList-list">
                    {services.map(s => (
                        <ServiceCard
                            key={s.id}
                            id={s.id}
                            title={s.title}
                            info={s.serviceInfo}
                            pay={s.pay}
                            postedBy={s.postedBy}
                            createdAt={s.createdAt}
                        />
                    ))}

                    </div>
            ) : (
                <p className="lead">Sorry, no results found!</p>
            )}
        </div>
    )
}

export default ServicesList;