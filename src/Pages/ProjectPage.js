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
                to = "/"
            >
                <b>Back</b>
            </Link>
            <h2 style={{ color: "white" }}>Projects</h2>
            <div className="card containers"></div>
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
