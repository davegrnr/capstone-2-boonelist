import React, { useState, useContext } from "react"
import BoonelistApi from "../../api/api";
import UserContext from "../../auth/UserContext";

/** New Comment Form
 * 
 * Submitting the form adds a new comment to sale or service
 * 
 * Routed as /<services_or_sales>/:id
 */

function NewCommentForm({ subjectId, route }) {
    const { currentUser } = useContext(UserContext)
    const BASE_STATE = {
        commentText: "",
        subjectId: subjectId,
        postedBy: currentUser.username
    }

    const [formData, setFormData] = useState(BASE_STATE);
    
    // const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(evt) {
        evt.preventDefault();
        console.log(formData)
        try {
            await BoonelistApi.createComment(formData, subjectId, route);
            setFormData(BASE_STATE)
            alert('Left comment!')
        } catch(errors) {
            setFormErrors(errors)
            return
        }

        setFormErrors([])
    }


    async function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({...f, [name]: value}))
    }

    return (
        <div className="NewCommentForm">
            <div className="container">
                <h4>Leave a comment</h4>
                <form onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-body">
                            <textarea 
                                name="commentText"
                                className="form-control comment-text"
                                value={formData.commentText}
                                onChange={handleChange}    
                            />
                        </div>
                        <button 
                            className="btn btn-primary btn-sm"
                            type="submit"
                            >Leave comment</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewCommentForm;