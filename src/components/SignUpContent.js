import React, {useContext, useState} from "react";
import AdmissionDataContent from "./AdmissionDataContent";
import "../css/SignUp.css";
import {UserContext} from "../UserContext";
import {api_root_address} from "../API";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUpComponent() {
    const fetch = require('node-fetch');
    var reqUrl = api_root_address + "/api/signup";
    const [user, setUser] = useContext(UserContext);
    const [loadDetailsPage, setDetailsPage] = useState(false);
    let data = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    }

    function handleChangeFirstName(event) {
        data.firstName = event.target.value;
        console.log(data.firstName);
    }

    function handleChangeLastName(event) {
        data.lastName = event.target.value;
        console.log(data.lastName);
    }

    function handleChangeEmail(event) {
        data.email = event.target.value;
        console.log(data.email);
    }

    function handleChangePassword(event) {
        data.password = event.target.value;
        console.log(data.password);
    }

    function submitData(event) {
        event.preventDefault();
        if (data.email.length === 0 || data.password.length === 0 || data.firstName.length === 0 || data.lastName.length === 0) {
            toast.error('Please enter the details', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,

            });
            toast.clearWaitingQueue();
        } else if (data.email.length > 0) {
            fetch(reqUrl, {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(result => {
                        console.log(result);
                        if (result.success) {
                            toast.success('Signed up Successfully 🎉', {
                                position: "top-right",
                                autoClose: 1200,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                            });
                            var new_value = {...user, userSignedin: true, userEmail: data.email}
                            setUser(new_value);
                            setDetailsPage(true);
                        } else if (result.userExists) {
                            toast.error('Email already exists', {
                                position: "top-right",
                                autoClose: 3500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            toast.clearWaitingQueue();
                        }
                    }
                );
        }
    }

    function checkEnterPressed(event) {
        if (event.key === "Enter") {
            submitData(event)
        }
    }

    if (!loadDetailsPage) {
        return (
            <div className="Signup">
                <form className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
                    <label htmlFor="inputFirstName" className="sr-only">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="inputFirstName"
                        className="form-control"
                        placeholder="First Name"
                        onChange={handleChangeFirstName}
                        required
                        autoFocus
                    />
                    <label htmlFor="inputLastName" className="sr-only">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="inputLastName"
                        className="form-control"
                        placeholder="Last Name"
                        onChange={handleChangeLastName}
                        required
                    />
                    <label htmlFor="inputEmail" className="sr-only">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                        onChange={handleChangeEmail}
                        required
                    />
                    <label htmlFor="inputPassword" className="sr-only">
                        Password
                    </label>
                    <input
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        onChange={handleChangePassword}
                        onKeyPress={checkEnterPressed}
                        required
                    />

                    <button
                        className="btn btn-lg btn-primary btn-block"
                        onClick={submitData}
                    >
                        Sign up
                    </button>
                </form>
            </div>
        );
    } else {
        return (
            <AdmissionDataContent/>
        );
    }
}

export default SignUpComponent;
