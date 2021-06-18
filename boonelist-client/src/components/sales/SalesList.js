import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BoonelistApi from '../../api/api'
import SalesCard from './SalesCard'
import LoadingSpinner from '../../common/LoadingSpinner'
import './SalesList.css'

function SalesList() {
    const [sales, setSales] = useState()

    useEffect(function getAllSalesOnMount(){
        search();
    }, [])

    async function search(itemName){
        let sales = await BoonelistApi.getSales(itemName)
        setSales(sales);
    }

    function handleDate(date){
        const dateFormat = new Date(date).toLocaleDateString('en-us',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        return dateFormat;
    }

    if(!sales) return <LoadingSpinner />

    return (
        <div className="SalesList">
            <h1>Items for Sale</h1>
            <div className="NewSalesForm-link">
                <Link to="/sales/new">Post New Item</Link>
            </div>
            {sales.length
            ? (
                <div className="SalesList-list">
                    {sales.map(s => (
                        <SalesCard
                            key={s.id}
                            id={s.id}
                            name={s.itemName}
                            info={s.itemInfo}
                            price={s.price}
                            createdAt={s.createdAt}
                            postedBy={s.postedBy}
                            handleDate={handleDate}
                        />
                    ))}
                    </div>
            ) : (
                <p className="lead">Sorry, no results found!</p>
            )}
        </div>
    )
}

export default SalesList;