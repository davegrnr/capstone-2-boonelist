import React, { useState, useEffect } from "react"
import CommentCard from './CommentCard'
import NewCommentForm from '../comment/NewCommentForm'
import './CommentCardList.css'


function CommentCardList({ comments, route, getSale, getService }){
    return (
        <div className="CommentCardList">
            {comments.map(comment => (
                <CommentCard 
                    key={comment.id}
                    commentId={comment.id}
                    salesId={comment.salesId}
                    commentText={comment.commentText}
                    postedBy={comment.postedBy}
                    createdAt={comment.createdAt}
                    route={route}
                    getSale={getSale}
                    getService={getService}
                />
            ))}
        </div>
    )
}

export default CommentCardList;