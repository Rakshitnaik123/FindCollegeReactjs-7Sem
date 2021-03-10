import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export function UserProvider(props) {
    const [user, setUser] = useState({
        userSignedin: false,
        userName: "user",
        userEmail: "",
        userSigningUp: false,
        userData: {
            gre: "",
            toefl: "",
            sop: "-",
            lor: "-",
            cgpa: "",
            research: "-"
        }
    })
    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
}

