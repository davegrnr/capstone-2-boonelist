
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from "react-router-dom";
import Sticky from 'react-sticky-el'
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

    function handleDate(date){
        const dateFormat = new Date(date).toLocaleDateString('en-us',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        })
        return dateFormat;
    }


    if(!sale) return <LoadingSpinner />

    return (
        <div className="SalesDetail">
            <div>
                <h1>{sale.itemName}</h1>
                <h3>${sale.price}</h3>
                <p>{sale.itemInfo}</p>
                <p>Posted by: {sale.postedBy}</p>
                <p>Posted on: {handleDate(sale.createdAt)}</p>
                {/* <img src={sale.pictures}></img> */}
            </div>
            <button className="btn back-btn btn-primary"><Link to="/sales" className="sales-link" style={{textDecoration: 'none'}}>Back to All Sales</Link></button>
            <hr />
            <div className="comments">

                <div className="comment-form">
                <h3 id="comment-header">Comments</h3>
                <br />
                <Sticky >
                    <NewCommentForm  
                                    username={currentUser.username}
                                    subjectId={id}
                                    route={route}
                                    getSale={getSale}
                    />
                </Sticky>
            </div>
                <CommentCardList comments={sale.comments}
                />
            </div>

        </div>

    )
}

export default SalesDetail;