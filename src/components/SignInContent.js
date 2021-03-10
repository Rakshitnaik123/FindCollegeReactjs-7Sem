import React, {useContext} from "react";
import '../css/SignIn.css'
import {UserContext} from "../UserContext";
import {Redirect} from "react-router-dom";
import {api_root_address} from "../API";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SigninComponent() {

    const fetch = require('node-fetch');
    var reqUrl = api_root_address + "/api/login";
    let data = {
        email: "",
        password: ""
    }

    const [user, setUser] = useContext(UserContext);
    let email = "",
        password = "";

    function handleChangeEmail(event) {
        email = event.target.value;
    }

    function handleChangePassword(event) {
        password = event.target.value;
    }


    function onSubmitSignIn() {
        data.email = email;
        data.password = password;
        if (data.email.length === 0 || data.password.length === 0) {
            toast.error('Please enter the details', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,

            });
            toast.clearWaitingQueue();
        } else {
            fetch(reqUrl, {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(result => {
                        console.log(result);
                        console.log(result.success);
                        if (result.success) {
                            toast.success('Logged in Successfully 🎉', {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                            });
                            let new_value = {...user, userSignedin: true, userEmail: data.email};
                            if (result.isAdmin)
                                new_value = {...new_value, userName: "admin"};
                            if (result.userDataExists) {
                                new_value.userData = {...result.userData}
                                console.log("Final new_value: ", new_value)
                            }
                            setUser(new_value);
                        } else {
                            toast.error('Incorrect email or password ❌', {
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
            onSubmitSignIn()
        }
    }

    if (!user.userSignedin)
        return (
            <div className="Signin">
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
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
                    autoFocus
                />
                <label htmlFor="inputPassword" className="sr-only">
                    Password
                </label>
                <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    onChange={handleChangePassword}
                    onKeyPress={checkEnterPressed}
                    placeholder="Password"
                    required
                />
                <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                    onClick={onSubmitSignIn}
                >
                    Sign in
                </button>
            </div>
        );
    else
        return (<Redirect to="/" push/>);
}

export default SigninComponent;