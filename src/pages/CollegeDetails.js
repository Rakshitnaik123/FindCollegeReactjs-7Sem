import React from "react";
import NavBar from "../components/NavBar";
import FooterBar from "../components/FooterBar";
import CollegeDetailsContent from "../components/CollegeDetailsContent";

function CollegeDetails(props) {
    return (
        <div>
            <NavBar/>
            <CollegeDetailsContent collegeName={props.match.params.clgName}/>
            <FooterBar/>
        </div>
    );
}

export default CollegeDetails;