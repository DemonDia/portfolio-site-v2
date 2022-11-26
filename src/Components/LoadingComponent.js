import React from "react";

function LoadingComponent(props) {
    return (
        <div className="card containers loadingContainer">
            <h4>Loading ...</h4>
            <div>
                <div class="spinner-border loader" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
}

export default LoadingComponent;
