import React from "react"
import './CommentCard.css'

function CommentCard({ key, id, saleId, commentText, postedBy, createdAt }){
    return (
        <div className="CommentCard">
            <div className="card-body">
                <h4><b>{postedBy}</b></h4>
                <h6>{createdAt}</h6>
                <p>{commentText}</p>
            </div>
        </div>
    )
}

export default CommentCard;