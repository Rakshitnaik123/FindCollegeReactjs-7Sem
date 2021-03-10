import React, {useContext} from "react";
import {Link} from "react-router-dom";
import '../css/HomePage.css';
import {UserContext} from "../UserContext";
import {useHistory} from "react-router";
import {toast} from "react-toastify";

function NavBar() {
    const [user, setUser] = useContext(UserContext);
    const history = useHistory();

    function logout() {
        toast.success('Logged out Successfully ✔️', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
        let new_value = {...user, userSignedin: false};
        if (user.userName === "admin")
            new_value = {...new_value, userName: "user"};
        setUser(new_value);
        // window.location.reload();
        history.push({
            pathname: "/"
        });
    }

    if (user.userName === "admin")
        return (
            <div className="NavBar_div">
                <nav className="nav navbar-dark bg-dark flex-even-space ">
                    <Link to="/">
                        <button type="button" className="btn btn-secondary">Home</button>
                    </Link>
                    <Link to="/colleges">
                        <button type="button" className="btn btn-secondary">Colleges</button>
                    </Link>
                    <Link to="/findcollege">
                        <button className="btn btn-secondary">Find College!</button>
                    </Link>
                    <Link to="/admin">
                        <button className="btn btn-secondary">Admin</button>
                    </Link>
                    <button type="button" className="btn btn-secondary" onClick={logout}>Logout</button>
                </nav>
            </div>
        );
    else if (!user.userSignedin)
        return (
            <div className="NavBar_div">
                <nav className="nav navbar-dark bg-dark flex-even-space ">
                    <Link to="/">
                        <button type="button" className="btn btn-secondary">Home</button>
                    </Link>
                    <Link to="/colleges">
                        <button type="button" className="btn btn-secondary">Colleges</button>
                    </Link>
                    <Link to="/findcollege">
                        <button className="btn btn-secondary">Find College!</button>
                    </Link>
                    <Link to="/signin">
                        <button type="button" className="btn btn-secondary">Signin</button>
                    </Link>

                    <Link to="/signup">
                        <button type="button" className="btn btn-secondary">Signup</button>
                    </Link>
                </nav>
            </div>
        );
    else if (user.userSignedin)
        return (
            <div className="NavBar_div">
                <nav className="nav navbar-dark bg-dark flex-even-space ">
                    <Link to="/">
                        <button type="button" className="btn btn-secondary">Home</button>
                    </Link>
                    <Link to="/colleges">
                        <button type="button" className="btn btn-secondary">Colleges</button>
                    </Link>
                    <Link to="/findcollege">
                        <button className="btn btn-secondary">Find College!</button>
                    </Link>
                    <button type="button" className="btn btn-secondary" onClick={logout}>Logout</button>
                </nav>
            </div>
        );

}

export default NavBar;