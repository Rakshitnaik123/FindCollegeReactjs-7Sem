import React from "react";
import NavBar from "../components/NavBar";
import FooterBar from "../components/FooterBar";
import SigninComponent from "../components/SignInContent";

function SignIn() {
    return (
        <div>
            <NavBar/>
            <SigninComponent/>
            <FooterBar/>
        </div>
    );
}

export default SignIn;