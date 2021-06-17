import React, { useState, useEffect } from "react"
import CommentCard from './CommentCard'
import NewCommentForm from '../comment/NewCommentForm'
import './CommentCardList.css'


function CommentCardList({ comments, route }){

    return (
        <div className="CommentCardList">
            {comments.map(comment => (
                <CommentCard 
                    key={comment.id}
                    id={comment.id}
                    salesId={comment.salesId}
                    commentText={comment.commentText}
                    postedBy={comment.postedBy}
                    createdAt={comment.createdAt}
                />
            ))}
                <div className="comment-form">
                <NewCommentForm
                    route={route}
                />
            </div>
        </div>
    )
}

export default CommentCardList;