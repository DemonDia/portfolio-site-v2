import React from "react";

function MainPage(props) {
    return (
        <div>
            {/* <h1 className="text-3xls underline">Main Page</h1> */}
            <div>
                <div className="card containers">
                    <h2>About me</h2>
                </div>
                <div className="card containers">
                    <h2>Skills</h2>
                </div>
                <div className="card containers">
                    <h2>Projects</h2>
                </div>
                <div className="card containers">
                    <h2>Experiences</h2>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
