import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp"
import FindCollege from "./pages/FindCollege";
import {UserProvider} from "./UserContext";
import Colleges from "./pages/Colleges";
import Particles from "react-particles-js";
import ShowColleges from "./components/ShowColleges";
import Admin from "./pages/Admin";
import {CollegeProvider} from "./CollegeContext";
import {ToastContainer} from "react-toastify";
import './App.css';
import CollegeDetails from "./pages/CollegeDetails";
import {api_root_address} from "./API";

function App() {
    // Ping to server to wake up
    fetch(api_root_address).then()

    return (
        <div className="App">
            <Particles className="bg-particles"
                       params={{
                           particles: {
                               color: {
                                   value: "#000000"
                               },
                               line_linked: {
                                   enable: true,
                                   color: "#535353",
                                   opacity: 0.5
                               },
                               links: {
                                   color: "#535353",
                                   distance: 150,
                                   enable: true,
                                   opacity: 0.5,
                                   width: 1.3,
                               },
                               number: {
                                   density: {
                                       enable: true,
                                       value_area: 2000,
                                   },
                                   value: 60,
                               },
                               size: {
                                   random: true,
                                   value: 7,
                               },
                           },
                           modes: {
                               bubble: {
                                   distance: 400,
                                   duration: 2,
                                   opacity: 0.8,
                                   size: 40,
                               },
                               push: {
                                   quantity: 1,
                               },
                               repulse: {
                                   distance: 10000,
                                   duration: 0.4,
                               },
                           },
                           interactivity: {
                               detectsOn: "window",
                               events: {
                                   onhover: {
                                       enable: true,
                                       mode: "repulse"
                                   }
                               }
                           }
                       }}/>
            <ToastContainer
                position="top-right"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                limit={6}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Router>
                <Switch>
                    <UserProvider>
                        <CollegeProvider>
                            <Route path="/" exact render={() => <HomePage/>}/>
                            <Route path="/signin" render={() => <SignIn/>}/>
                            <Route path="/signup" render={() => <SignUp/>}/>
                            <Route path="/findcollege" render={() => <FindCollege/>}/>
                            <Route path="/colleges" render={() => <Colleges/>}/>
                            <Route path="/result" render={(props) => <ShowColleges  {...props}/>}/>
                            <Route path="/admin" render={(props) => <Admin  {...props}/>}/>
                            <Route path="/college/:clgName" render={(props) => <CollegeDetails  {...props}/>}/>
                        </CollegeProvider>
                    </UserProvider>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
