import React, { useState } from "react";

function ProjectItem(props) {
    return (
        <div class="col-6">
            <div
                class="card projectItem"
                style={{ margin: "10px", padding: "10px" }}
            >
                <h4>
                    {props.project.name} ({props.project.year})
                </h4>
                <img
                    class=""
                    src={props.project.image}
                    style={{ height: "25%" }}
                />
            </div>
        </div>
    );
}

export default ProjectItem;
