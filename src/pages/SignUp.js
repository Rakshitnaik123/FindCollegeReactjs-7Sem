import React from "react";
import NavBar from "../components/NavBar";
import SignUpComponent from "../components/SignUpContent";
import FooterBar from "../components/FooterBar";

function SignUp() {
    return (
        <div>
            <NavBar/>
            <SignUpComponent/>
            <FooterBar/>
        </div>
    );
}

export default SignUp;
