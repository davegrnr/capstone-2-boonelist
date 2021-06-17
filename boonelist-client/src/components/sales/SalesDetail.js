
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from "react-router-dom";
import BoonelistApi from '../../api/api'
import UserContext from '../../auth/UserContext';
import NewCommentForm from '../comment/NewCommentForm';
import CommentCardList from '../comment/CommentCardList';
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
    const { id } = useParams();
    const currentUser = useContext(UserContext);
    const route = 'sales'

    const [sale, setSale] = useState()

    useEffect(function getSaleById() {

        async function getSale(){
            setSale(await BoonelistApi.getSale(id))
        }
        getSale();
    }, [id]);

    async function getSale(id){
        let sale = await BoonelistApi.getSale(id)
        setSale(sale)
    }




    if(!sale) return <LoadingSpinner />

    return (
        <div className="SalesDetail">
            <div>
                <h1>{sale.itemName}</h1>
                <h3>${sale.price}</h3>
                <p>{sale.itemInfo}</p>
            </div>
            <hr />
            <div className="comments">
                <p>Comments</p>
                <CommentCardList comments={sale.comments}
                />
            </div>

            <div className="comment-form">
                <NewCommentForm  
                                username={currentUser.username}
                                subjectId={id}
                                route={route}
                                getSale={getSale}
                />
            </div>
            <button className="btn btn-primary"><Link to="/sales" className="sales-link" style={{textDecoration: 'none'}}>Back to All Sales</Link></button>
        </div>

    )
}

export default SalesDetail;