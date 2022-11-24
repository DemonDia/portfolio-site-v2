import React, { useState } from "react";

function ProjectItem(props) {
    const [hovered, setHovered] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <div class="col-6">
                <a
                // href=""
                // onMouseEnter={() => {
                //     setHovered(true);
                // }}
                // onMouseLeave={() => {
                //     setHovered(false);
                // }}
                >
                    <div
                        class="card projectItem"
                        style={{ margin: "10px", padding: "10px" }}
                        data-bs-toggle="modal"
                        // data-bs-target="#LOL"
                        data-bs-target={"#X" + props.project._id}
                    >
                        <h4>
                            {props.project.name} ({props.project.year})
                        </h4>
                        <img class="" src={props.project.image} />
                        <p>Click for more info!</p>
                    </div>
                </a>
            </div>
            <div
                class="modal fade"
                // id="LOL"
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
                            <h4
                                class="modal-title fs-5"
                                id="staticBackdropLabel"
                            >
                                {props.project.name} ({props.project.year})
                            </h4>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            <h5 style={{ textAlign: "left" }}>Tech Stacks</h5>
                            <p style={{ textAlign: "left" }}>
                                {props.project.tech_stack.map((techStack) => {
                                    return <>{techStack}, </>;
                                })}
                            </p>

                            <h5 style={{ textAlign: "left" }}>Links</h5>
                            <p style={{ textAlign: "left" }}>
                                {props.project.links.map((link) => {
                                    return (
                                        <>
                                            <a
                                                href={link.url}
                                                style={{ color: "white" }}
                                            >
                                                {link.name}
                                            </a>
                                            ,{" "}
                                        </>
                                    );
                                })}
                            </p>
                        </div>
                        <div class="modal-footer"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectItem;
