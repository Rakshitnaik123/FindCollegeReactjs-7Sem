import React from "react";
import Card from "./Cards";
import '../css/Footer.css';

function FooterBar() {
    return (
        <div>
            {/*<hr/>*/}
            <div className="FooterFrame">
                <div className="ppl-card">
                    <Card name="Manoj Galanki" link="https://www.linkedin.com/in/manoj-galanki-98042a1b7/" type="ppls"/>
                </div>
                <div className="ppl-card">
                    <Card name="Mayank Anuragi" link="https://www.linkedin.com/in/mayank-anuragi/" type="ppls"/>
                </div>
                <div className="ppl-card">
                    <Card name="Rakshit Naik" link="https://www.linkedin.com/in/rakshit-naik-71a23714a/" type="ppls"/>
                </div>
            </div>
        </div>

    );
}

export default FooterBar;