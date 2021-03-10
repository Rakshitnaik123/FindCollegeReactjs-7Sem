import React from "react";
import Card from "./Cards";

function FindCollegeResults(props) {
    let content;
    const collegesDetails = props.collegesDetails;
    content = (
        <div className="colleges-content">
            {collegesDetails.map(clg => (
                <Card type={"clgs"} id={clg.id} name={clg.name} rating={clg.rating}/>
            ))}
        </div>
    );
    return (
        {content}
    );
}

export default FindCollegeResults