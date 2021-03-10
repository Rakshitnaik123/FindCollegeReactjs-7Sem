import React, {createContext, useState} from 'react';

export const CollegeContext = createContext();

export function CollegeProvider(props) {

    const [colleges, setColleges] = useState([]);
    return (
        <CollegeContext.Provider value={[colleges, setColleges]}>
            {props.children}
        </CollegeContext.Provider>
    );
}

