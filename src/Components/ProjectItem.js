import React, { useState } from "react";
import { Link } from "react-router-dom";
function ProjectItem(props) {
    return (
        <>
            <div className=" col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <a style={{ color: "white", textDecoration: "none" }}>
                    <div
                        class="card projectItem"
                        style={{ margin: "10px", padding: "10px" }}
                        data-bs-toggle="modal"
                        // data-bs-target="#LOL"
                        data-bs-target={"#X" + props.project._id}
                    >
                        <h1>
                            {props.project.name} ({props.project.year})
                        </h1>
                        <img class="" src={props.project.image} />
                        <Link style={{ color: "white", fontSize: "18px" }}>
                            Click for more info!
                        </Link>
                    </div>
                </a>
            </div>
            <div
                class="modal fade"
                id={"X" + props.project._id}
                data-bs-keyboard="false"
                tabindex="-1"
            >
                <div class="modal-dialog">
                    <div
                        class="modal-content"
                        style={{ background: "#475466" }}
                    >
                        <div class="modal-header">
                            <h1 class="modal-title" id="staticBackdropLabel">
                                {props.project.name} ({props.project.year})
                            </h1>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            <h2 style={{ textAlign: "left" }}>Tech Stacks</h2>
                            <ul style={{ textAlign: "left", fontSize: "15px" }}>
                                {props.project.tech_stack.map((techStack) => {
                                    return (
                                        <li>
                                            {" "}
                                            {techStack}
                                            <br></br>{" "}
                                        </li>
                                    );
                                })}
                            </ul>

                            <h2 style={{ textAlign: "left" }}>Links</h2>
                            <ul style={{ textAlign: "left", fontSize: "15px" }}>
                                {props.project.links.map((link) => {
                                    return (
                                        <li>
                                            <a
                                                target={"_blank"}
                                                href={link.url}
                                                style={{ color: "white" }}
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div class="modal-footer"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectItem;
