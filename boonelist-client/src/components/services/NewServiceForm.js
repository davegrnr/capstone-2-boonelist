import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import Alert from '../../common/Alert'
import BoonelistApi from '../../api/api'
import UserContext from '../../auth/UserContext'

/** New service form
 * Submitting the form creates a new service with the provided data.
 * 
 * Confirmation is a simple <Alert>
 * 
 * Routed as /services
 */

function NewServiceForm() {
    const { currentUser } = useContext(UserContext)
    const history = useHistory();

    const [formData, setFormData] = useState({
        title: "",
        pay: "",
        serviceInfo: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    const [saveConfirmed, setSaveConfirmed] = useState(false);

    /** On form submit:
     *  - Attempt save to backend, report any errors
     *  -On success:
     *      -Show new service confirmation
     *      -Redirect to services list
     */

    async function handleSubmit(evt) {
        evt.preventDefault();

        let username = currentUser.username
        try {
            await BoonelistApi.createService(formData, username);
            alert("Service Created!")
        } catch(errors){
            setFormErrors(errors);
            return
        }
        
        setFormErrors([])
        history.push(`/services`)
    }

    async function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({...f, [name]: value}))
    }


    return (
        <div className="SignupForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <h2 className="mb-3">Post New Service</h2>
            <div className="card">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Pay</label>
                    <input
                        name="pay"
                        className="form-control"
                        value={formData.pay}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="serviceInfo"
                        className="form-control"
                        value={formData.serviceInfo}
                        onChange={handleChange}
                    />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }

                <button
                    type="submit"
                    className="btn btn-primary float-right"
                    onSubmit={handleSubmit}
                >
                    Submit
                </button>
                </form>
            </div>
                <div>
                    <Link to="/services">Go Back to All Services</Link>
                </div>
            </div>
        </div>
        </div>
    );
}

export default NewServiceForm;