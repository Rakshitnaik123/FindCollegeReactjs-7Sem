import React, {useEffect, useState} from "react";
import {api_root_address} from "../API";
import {toast} from "react-toastify";
import Stars from "./Stars";
import "../css/CollegeDetails.css";

function CollegeDetailsContent(props) {
    const clgName = props.collegeName;
    const reqUrl = api_root_address + "/api/" + clgName.toLowerCase().replaceAll(" ", "-");
    const [isLoading, setIsLoading] = useState(true);
    const [collegeDetails, setCollegeDetails] = useState({
        'id': '',
        'name': '',
        'clgDesc': '',
        'vision': '',
        'mission': [],
        'address': '',
        'G-MapLink': '',
        'programsOffered': [],
        'BE': [],
        'MTECH': [],
        'MBA': [],
        'PHD': [],
        'placements': '',
        'rating': 0
    })
    let makeHTMLList = (data, setFunction) => {
        let count = 100;
        if (data.length > 0)
            setFunction(
                <ul style={{"listStyleType": "circle"}}>
                    {data.map(eachItem => (
                        <li key={count++}><h3>{eachItem}</h3></li>
                    ))}
                </ul>
            );
    }
    const [mission, setMission] = useState();
    const [BECourses, setBECourses] = useState();
    const [MTechCourses, setMTechCourses] = useState();
    const [MBACourses, setMBACourses] = useState();
    const [PHDCourses, setPHDCourses] = useState();
    useEffect(() => {
            setIsLoading(true);
            fetch(reqUrl)
                .then(res => res.json())
                .then(data => {
                        if (data.success) {
                            setIsLoading(false);
                            setCollegeDetails({...data.details});
                            if (Array.isArray(data.details.mission)) {
                                let count = 0;
                                setMission(
                                    <ul style={{"listStyleType": "circle"}}>
                                        {data.details.mission.map(mission => (
                                            <li key={count++}><p className="fontsize">{mission}</p></li>
                                        ))}
                                    </ul>
                                );
                            } else
                                setMission(<p> {data.details.mission}</p>)
                        } else {
                            toast.error('Error occurred! Please contact Admin', {
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
                        makeHTMLList(data.details.BE, setBECourses);
                        makeHTMLList(data.details.MTECH, setMTechCourses);
                        makeHTMLList(data.details.MBA, setMBACourses);
                        makeHTMLList(data.details.PHD, setPHDCourses);

                    }
                );

            // eslint-disable-next-line
        }, []
    )
    let content = <p>Loading college details...</p>;
    if (!isLoading) {
        content = (
            <div id={"college-detail"}>
                <div className="row">

                    <div className="side-content col-sm-4">
                        <h2>{collegeDetails.name}</h2>
                        <div className="logo centre-h">
                            <img
                                src={api_root_address + '/static/images/' + collegeDetails.name.trim().replaceAll(" ", "-").replaceAll('.', '-').toLowerCase() + '/logo.png'}
                                width="200" alt={"college logo"}/>
                        </div>

                        <br/>

                        <hr className="dashed"/>
                        <div className="rating">
                            <h2>Rating</h2>
                            <div>
                                <Stars numStars={collegeDetails.rating}/>
                            </div>
                        </div>

                        <br/>

                        <hr className="dashed"/>
                        <h2>Visit us</h2>
                        <p>{collegeDetails.address}</p>
                        <div className="centre-h">
                            <iframe
                                src={collegeDetails["G-MapLink"]}
                                width="350" height="300" style={{"border": 0}} allowFullScreen=""
                                aria-hidden="false" tabIndex="0" title={collegeDetails.id}>
                            </iframe>
                        </div>

                    </div>
                    <div className="main-content col-sm-8">
                        <ul className="nav nav-pills mb-3 nav-tabs" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="pills-about-college-tab" data-toggle="tab"
                                   href="#pills-about-college" role="tab"
                                   aria-controls="pills-about-college" aria-selected="true">About College</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-programs-offered-tab" data-toggle="pill"
                                   href="#pills-programs-offered" role="tab"
                                   aria-controls="pills-programs-offered" aria-selected="false">Programs Offered</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-placements-tab" data-toggle="pill"
                                   href="#pills-placements" role="tab"
                                   aria-controls="pills-placements" aria-selected="false">Placements</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-about-college" role="tabpanel"
                                 aria-labelledby="pills-about-college-tab">
                                <h1>About College</h1>
                                <p className="fontsize">{collegeDetails.clgDesc}</p>
                                <hr className="rounded"/>
                                <h1>Vision</h1>
                                <div><p className="fontsize">{collegeDetails.vision}</p>
                                </div>
                                <hr className="rounded"/>
                                <h1>Mission</h1>
                                <h3>{collegeDetails.name} is committed to:</h3>
                                {mission}
                            </div>
                            <div className="tab-pane fade" id="pills-programs-offered" role="tabpanel"
                                 aria-labelledby="pills-programs-offered-tab">
                                {collegeDetails.BE.length > 0 ? <div>
                                    <hr className="rounded"/>
                                    <h2>B.E</h2>{BECourses} </div> : ""}

                                {collegeDetails.MTECH.length > 0 ? <div>
                                    <hr className="rounded"/>
                                    <h2>M.TECH</h2>{MTechCourses} </div> : ""}
                                {collegeDetails.MBA.length > 0 ? <div>
                                    <hr className="rounded"/>
                                    <h2>MBA</h2>{MBACourses} </div> : ""}
                                <br/>
                                {collegeDetails.PHD.length > 0 ? <div>
                                    <hr className="rounded"/>
                                    <h2>PHD</h2>{PHDCourses} </div> : ""}
                            </div>
                            <div className="tab-pane fade" id="pills-placements" role="tabpanel"
                                 aria-labelledby="pills-placements-tab">
                                <div className="centre-h">
                                    <img
                                        src={api_root_address + '/static/images/' + collegeDetails.name.trim().replaceAll(" ", "-").replaceAll('.', '-').toLowerCase() + '/placements.png'}
                                        alt={"placements"} id={"placements-logo"}/>
                                </div>
                                <p className="fontsize">{collegeDetails.placements}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return content;

}

export default CollegeDetailsContent;