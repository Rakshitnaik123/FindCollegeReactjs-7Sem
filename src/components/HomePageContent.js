import React from "react";
import '../css/HomePage.css'
import {Link} from "react-router-dom";

function HomePageContent() {
    return (
        <div className="HomePageContent">
            <h1>Welcome to College Finder</h1>
            <Link to="/findcollege">
                <button type="button" className="btn btn-primary">Find College!</button>

            </Link>
        </div>
    );
}

export default HomePageContent;