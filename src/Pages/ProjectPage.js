import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProjectItem from "../Components/ProjectItem";
function ProjectPage(props) {
    const [projects, setProjects] = useState([]);
    const getProjects = async () => {
        await axios
            .get(process.env.REACT_APP_BACKEND_API + "/projects")
            .then((res) => {
                if (res.data.success) {
                    var fetchedProjects = res.data.data.sort(function (a, b) {
                        return b.year - a.year;
                    });
                    setProjects(fetchedProjects);
                }
            });
    };

    useEffect(() => {
        getProjects();
    }, []);
    return (
        <div style={{ margin: "10px", padding: "10px" }}>
            <Link
                style={{
                    color: "white",
                    textDecoration: "none",
                    textAlign: "left",
                    display: "block",
                }}
                to="/"
            >
                <b>Back</b>
            </Link>
            <h2 style={{ color: "white" }}>Projects</h2>
            <div className="card containers">
                <div className="row">
                    <div className="col-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name"
                        />
                    </div>
                    <div className="col-3">
                        <select class="form-select">
                            <option selected value="0">
                                Select Year
                            </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <select class="form-select">
                            <option selected value = "0">Sort by</option>
                            <option value="1">A-Z</option>
                            <option value="2">Z-A</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="card containers">
                <div class="row">
                    {projects ? (
                        projects.map((project) => {
                            return (
                                <ProjectItem project={project}></ProjectItem>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectPage;
