import React from "react";
import NavBar from "../components/NavBar";
import HomePageContent from "../components/HomePageContent";
import FooterBar from "../components/FooterBar";

function HomePage() {
    return (
        <div>
            <NavBar/>
            <HomePageContent/>
            <FooterBar/>

        </div>
    );
}

export default HomePage;