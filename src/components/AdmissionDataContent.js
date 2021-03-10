import React, {useContext, useState} from "react";
import "../css/SignUp.css";
import {UserContext} from "../UserContext";
import {Redirect} from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {api_root_address} from "../API";

function AdmissionDataContent() {
    const fetch = require('node-fetch');
    const reqUrl = api_root_address + "/api/admissions";
    const [redirect, setRedirect] = useState(false);
    const [user, setUser] = useContext(UserContext);
    let data = {
        email: "",
        gre: "",
        toefl: "",
        sop: "",
        lor: "",
        cgpa: "",
        research: ""
    }

    function handleChangeGRE(event) {
        data.gre = event.target.value;
        console.log(data.gre);
    }

    function handleChangeTOEFL(event) {
        data.toefl = event.target.value;
        console.log(data.toefl);
    }


    function handleChangeCGPA(event) {
        data.cgpa = event.target.value;
        console.log(data.cgpa);
    }


    function submitData(event) {
        event.preventDefault();

        data.sop = document.getElementById("inputSOP").value;

        data.lor = document.getElementById("inputLOR").value;

        data.research = document.getElementById("inputResearch").value;
        let isValid = true;
        if (data.gre.length === 0 || data.toefl.length === 0 || data.cgpa.length === 0) {
            toast.error('Please enter the details', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,

            });
            toast.clearWaitingQueue();
            return;
        }
        if (!(data.gre >= 0 && data.gre <= 360)) {
            isValid = false;
            toast.error('GRE valid range is in between 0 to 360', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,

            });
        }
        if (!(data.toefl >= 0 && data.toefl <= 120)) {
            isValid = false;
            toast.error('TOEFL valid range is in between 0 to 120', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,

            });
        }
        if (data.sop === "-") {
            isValid = false;
            toast.error('Please select SOP field', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,

            });
        }
        if (data.lor === "-") {
            isValid = false;
            toast.error('Please select LOR field', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,

            });
        }
        if (!(data.cgpa >= 0 && data.cgpa <= 10)) {
            isValid = false;
            toast.error('CGPA valid range is in between 0 to 10', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,

            });
        }
        if (data.research === "-") {
            isValid = false;
            toast.error('Please select Research field', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,

            });
        }
        toast.clearWaitingQueue();

        if (isValid) {

            data.email = user.userEmail;
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
                            var new_value = {...user, userData: {...data}}
                            setUser(new_value);
                            setRedirect(true);
                        }
                    }
                );
        }
    }


    if (!redirect)
        return (
            <div className="Signup">
                <form className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal">Please fill the following details</h1>

                    <label htmlFor="inputGRE" className="sr-only">
                        GRE Score
                    </label>
                    <input
                        type="text"
                        id="inputGRE"
                        className="form-control"
                        placeholder="GRE"
                        onChange={handleChangeGRE}
                        required
                        autoFocus
                    />

                    <label htmlFor="inputTOEFL" className="sr-only">
                        TOEFL Score
                    </label>
                    <input
                        type="text"
                        id="inputTOEFL"
                        className="form-control"
                        placeholder="TOEFL"
                        onChange={handleChangeTOEFL}
                        required
                    />

                    <label htmlFor="inputSOP" className="sr-only">
                        SOP
                    </label>

                    <select id="inputSOP" name="inputSOP">
                        <option value="-">SOP</option>
                        <option value="1">SOP 1</option>
                        <option value="2">SOP 2</option>
                        <option value="3">SOP 3</option>
                        <option value="4">SOP 4</option>
                        <option value="5">SOP 5</option>
                    </select>

                    <label htmlFor="inputLOR" className="sr-only">
                        LOR
                    </label>

                    <select id="inputLOR" name="inputLOR">
                        <option value="-">LOR</option>
                        <option value="1">LOR 1</option>
                        <option value="2">LOR 2</option>
                        <option value="3">LOR 3</option>
                        <option value="4">LOR 4</option>
                        <option value="5">LOR 5</option>
                    </select>
                    <label htmlFor="inputCGPA" className="sr-only">
                        CGPA
                    </label>
                    <input
                        type="text"
                        id="inputCGPA"
                        className="form-control"
                        placeholder="CGPA"
                        onChange={handleChangeCGPA}
                        required
                    />

                    <label htmlFor="inputResearch" className="sr-only">
                        Research
                    </label>

                    <select id="inputResearch" name="inputResearch">
                        <option value="-">Research</option>
                        <option value="1">Research Yes</option>
                        <option value="0">Research No</option>
                    </select>
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        onClick={submitData}
                    >
                        Complete Sign up
                    </button>
                </form>
            </div>
        );
    else
        return (<Redirect to="/" push/>);
}

export default AdmissionDataContent;