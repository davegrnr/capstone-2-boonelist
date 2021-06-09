import React, { useState, useEffect } from 'react'
import BoonelistApi from '../../api/api'
import SalesCard from './SalesCard'
import LoadingSpinner from '../../common/LoadingSpinner'

function SalesList() {
    const [sales, setSales] = useState()

    useEffect(function getAllSalesOnMount(){
        search();
    }, [])

    async function search(itemName){
        let sales = await BoonelistApi.getSales(itemName)
        setSales(sales);
    }

    if(!sales) return <LoadingSpinner />

    return (
        <div className="SalesList">
            <h1>List of Sales</h1>
            {sales.length
            ? (
                <div className="SalesList-list">
                    {sales.map(s => (
                        <SalesCard
                            key={s.id}
                            name={s.itemName}
                            info={s.itemInfo}
                            price={s.price}
                            postedBy={s.postedBy}
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