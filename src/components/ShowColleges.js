import React, {useContext, useEffect, useState} from "react";
import {api_root_address} from "../API";
import Card from "./Cards";
import "../css/Colleges.css"
import "../css/ShowColleges.css";
import {toast} from "react-toastify";
import NavBar from "./NavBar";
import FooterBar from "./FooterBar";
import {Redirect} from "react-router-dom";
import {CollegeContext} from "../CollegeContext";
import AddCollege from "./AddCollege";

function ShowColleges(props) {
    // eslint-disable-next-line no-unused-vars
    const [colleges, setColleges] = useContext(CollegeContext);
    // const [collegesDetails, setcollegesDetails] = useState([]);
    const [collegesDetailsCopy, setcollegesDetailsCopy] = useState([]);
    const [collegesMeta, setcollegesMeta] = useState({
        numOfColleges: "",
        showCount: false,
        setDisplay: "none"
    });
    const [isLoading, setIsLoading] = useState(false);
    const fetch = require('node-fetch');
    const reqUrl = api_root_address + "/api/colleges";
    let searchCollegeText = "";
    try {
        props = props.location.state;
    } catch (e) {
    }

    const isAllowed = !(props === undefined);

    function handelFilterColleges(event) {
        searchCollegeText = event.target.value;
        if (searchCollegeText === "") {
            setColleges(collegesDetailsCopy);
            setcollegesMeta({...collegesMeta, numOfColleges: "", setDisplay: "none", showCount: true});
        } else {
            const filteredColleges = collegesDetailsCopy.filter(clg => clg.name.toLowerCase().includes(searchCollegeText.toLowerCase()));
            setcollegesMeta({
                ...collegesMeta,
                numOfColleges: filteredColleges.length.toString(),
                setDisplay: "inline",
                showCount: true
            });
            if (filteredColleges.length > 0)
                setColleges(filteredColleges);
        }
    }


    useEffect(() => {
        setIsLoading(true);
        if (isAllowed && (props.type === "normal" || props.type === "admin")) {
            fetch(reqUrl)
                .then(response => response.json())
                .then(data => {
                        const recievedColleges = data.slice();
                        setIsLoading(false);
                        const collegesData = recievedColleges.map((clg) => ({
                            id: clg.id,
                            name: clg.name,
                            rating: clg.rating
                        }));
                        setColleges(collegesData);
                        setcollegesDetailsCopy(collegesData);
                    }
                )
                .catch(err => {
                    setIsLoading(false);
                });
        } else if (isAllowed && props.type === "prediction") {
            fetch(reqUrl, {
                method: 'post',
                body: JSON.stringify(props.userData),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(data => {
                        if (data.success) {
                            const colleges = data.clgs.slice();
                            setIsLoading(false);
                            const collegesData = colleges.map((clg) => ({
                                id: clg.id,
                                name: clg.name,
                                rating: clg.rating,
                                chance: clg.chance

                            }));
                            setcollegesDetailsCopy(collegesData);
                            setColleges(collegesData);
                        } else {
                            toast.error('Error occurred!', {
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
        // eslint-disable-next-line
    }, [])


    let content = <p>Loading colleges...</p>;
    if (!isLoading && colleges && colleges.length > 0) {
        content = (
            <div>
                <NavBar/>
                <div className="search-div">
                    <p>
                        Search College
                    </p>
                    <label>
                        College Name:
                    </label>
                    <input className="college-search-bar" type="text" placeholder="Enter College Name"
                           onChange={handelFilterColleges}/>
                    <span style={{
                        display: collegesMeta.setDisplay,
                        color: "red"
                    }}>{collegesMeta.numOfColleges} Colleges found</span>
                    {props.type === "admin" ?
                        <button type="button" className="btn btn-success" data-toggle="collapse" aria-pressed="false"
                                data-target="#collapseExample">Add college</button> : ""}
                    <div className="collapse" id="collapseExample">
                        <div className="card card-body roundBorder">
                            <AddCollege/>
                        </div>
                    </div>
                </div>
                <div className="colleges-content">
                    {colleges.map(clg => (
                        <Card type={props.type} key={clg.id} id={clg.id} name={clg.name} rating={clg.rating}
                              chance={props.type === "normal" ? 0 : clg.chance}/>
                    ))}
                </div>

                <FooterBar/>
            </div>

        );
    } else if (!isLoading && (!colleges || colleges.length === 0)) {
        content = <p>Could not fetch any data.</p>;
    }
    if (props === undefined)
        content =
            <div>
                <Redirect to="/" push/>
            </div>

    return content;
}

export default ShowColleges;

