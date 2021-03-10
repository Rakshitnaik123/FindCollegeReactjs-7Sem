import React from "react";

function Stars(props) {
    return (
        <div>
            {"⭐".repeat(props.numStars)}
        </div>
    )
}

export default Stars;