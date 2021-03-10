import React, {useContext} from "react";
import {UserContext} from "../UserContext";
import {Redirect} from "react-router-dom";
import AdminComponent from "../components/AdminComponent";

function Admin() {
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useContext(UserContext);
    console.log("user.userName === \"admin\"", user.userName === "admin");
    if (user.userName === "admin")
        return (
            <div>
                <AdminComponent/>
            </div>
        );
    else
        return (
            <Redirect to="/" push/>
        );
}

export default Admin;