import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProjectItem from "../Components/ProjectItem";
function ProjectPage(props) {
    const [projects, setProjects] = useState([]);

    // search as you type
    const [search, setSearch] = useState("");

    // filter year
    const [filterYear, setFilterYear] = useState(0);
    const [availableYears, setAvailableYears] = useState([]);

    // in A-Z or Z-A
    const [sortBy, setSortBy] = useState(0);

    const getProjects = async () => {
        await axios
            .get(process.env.REACT_APP_BACKEND_API + "/projects")
            .then((res) => {
                if (res.data.success) {
                    var fetchedProjects = res.data.data.sort(function (a, b) {
                        return b.year - a.year;
                    });
                    var allAvailableYears = [];
                    fetchedProjects.map((proj) => {
                        if (!allAvailableYears.includes(proj.year)) {
                            allAvailableYears.push(proj.year);
                        }
                    });
                    setAvailableYears(allAvailableYears);
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
            Search: {search}
            <br></br>
            Filter year: {filterYear}
            <br></br>
            Sort by: {sortBy}
            <div className="card containers">
                <div className="row">
                    <div className="col-4">
                        <input
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            type="text"
                            className="form-control"
                            placeholder="Search by name"
                        />
                    </div>
                    <div className="col-3">
                        <select
                            class="form-select"
                            onChange={(e) => {
                                setFilterYear(e.target.value);
                            }}
                        >
                            <option selected value="0">
                                Select Year
                            </option>

                            {availableYears ? (
                                availableYears.reverse().map((year) => {
                                    return <option value={year}>{year}</option>;
                                })
                            ) : (
                                <></>
                            )}
                        </select>
                    </div>
                    <div className="col-3">
                        <select
                            class="form-select"
                            onChange={(e) => {
                                setSortBy(e.target.value);
                            }}
                        >
                            <option selected value="0">
                                Sort by
                            </option>
                            <option value="1">A-Z</option>
                            <option value="2">Z-A</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="card containers">
                <div class="row">
                    {projects ? (
                        projects
                            .filter(
                                (project) =>
                                    (filterYear > 0?project.year == filterYear:project )&&
                                    project.name
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                            ).sort((a, b) => 
                            sortBy == 1?
                            (a.name > b.name ? 1 : -1):
                            sortBy == 2?
                            (b.name > a.name ? 1 : -1):-1
                            )
                            .map((project) => {
                                return (
                                    <ProjectItem
                                        project={project}
                                    ></ProjectItem>
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
