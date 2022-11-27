import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import ProjectItem from "../Components/ProjectItem";
import { Link } from "react-router-dom";
import LoadingComponent from "../Components/LoadingComponent";
import MessageComponent from "../Components/MessageComponent";
function MainPage() {
    const [skills, setSkills] = useState(null);
    const [projects, setProjects] = useState([]);
    const [experiences, setExperiences] = useState([]);

    const [loadedSkills, setLoadedSkills] = useState(false);
    const [loadedProjects, setLoadedProjects] = useState(false);

    const [loadedExperiences, setLoadedExperiences] = useState(false);

    // get the data
    const getSklls = async () => {
        await axios
            .get(process.env.REACT_APP_BACKEND_API + "/skills")
            .then((res) => {
                if (res.data.success) {
                    const fetchedSkills = res.data.data;
                    var skillDict = {};
                    fetchedSkills.map((skill) => {
                        if (skillDict.hasOwnProperty(skill.year_learnt)) {
                            skillDict[skill.year_learnt].push(skill.name);
                        } else {
                            skillDict[skill.year_learnt] = [skill.name];
                        }
                    });
                    // sort in alphabetical order
                    Object.keys(skillDict).map((year) => {
                        skillDict[year] = skillDict[year].sort();
                    });

                    setSkills(skillDict);
                    setLoadedSkills(true);
                }
            });
    };
    const getProjects = async () => {
        await axios
            .get(process.env.REACT_APP_BACKEND_API + "/projects")
            .then((res) => {
                if (res.data.success) {
                    var fetchedProjects = res.data.data.sort(function (a, b) {
                        return b.year - a.year;
                    });
                    fetchedProjects = fetchedProjects.slice(0, 4);
                    setProjects(fetchedProjects);
                    setLoadedProjects(true);
                }
            });
    };
    const getExperiences = async () => {
        await axios
            .get(process.env.REACT_APP_BACKEND_API + "/experiences")
            .then((res) => {
                if (res.data.success) {
                    setExperiences(res.data.data);
                    setLoadedExperiences(true);
                }
            });
    };
    useEffect(() => {
        getSklls();
        getExperiences();
        getProjects();
    }, []);
    return (
        <div>
            <div style={{ marginTop: "10px" }}>
                <div className="card containers" id="home">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6">
                            <h2>About me</h2>
                            <hr></hr>
                            <p style={{ textAlign: "left" }}>
                                <h1>Lee Siang Meng | Full Stack</h1>
                                
                                &nbsp; &nbsp; &nbsp;Hello, I am a{" "}
                                <b style={{ color: "#B1B1FF" }}>penultimate </b>
                                student at Singapore Management University.
                                <br></br>
                                &nbsp; &nbsp; &nbsp;I love doing collaborative
                                work with others while learning in the process!
                                <br></br>
                                <MessageComponent/>

                                <br></br>
                                <a
                                    target="_blank"
                                    href="mailto:sm.lee.2020@smu.edu.sg"
                                >
                                    <button
                                        className="btn contactBtn"
                                        id="emailBtn"
                                    >
                                        <i class="fa fa-envelope"></i>
                                    </button>
                                </a>
                                <a
                                    target="_blank"
                                    href="https://www.linkedin.com/in/leesiangmeng"
                                >
                                    <button
                                        className="btn contactBtn"
                                        id="linkedinBtn"
                                    >
                                        <i class="fa fa-linkedin"></i>
                                    </button>
                                </a>
                                <a
                                    target="_blank"
                                    href="https://github.com/demondia"
                                >
                                    <button
                                        className="btn contactBtn"
                                        id="githubBtn"
                                    >
                                        <i class="fa fa-github"></i>
                                    </button>
                                </a>
                                <a
                                    target="_blank"
                                    href="https://www.instagram.com/xdemondia/"
                                >
                                    <button
                                        className="btn contactBtn"
                                        id="igBtn"
                                    >
                                        <i class="fa fa-instagram"></i>
                                    </button>
                                </a>
                                <a
                                    target="_blank"
                                    href="https://www.youtube.com/channel/UCvEhzkvCpaxv0xG747RpAWg"
                                >
                                    <button
                                        className="btn contactBtn"
                                        id="igBtn"
                                    >
                                        <i class="fa fa-youtube"></i>
                                    </button>
                                </a>
                            </p>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6">
                            <div id="picContainer"></div>
                        </div>
                    </div>
                </div>
                {loadedSkills ? (
                    <div className="card containers" id="skills">
                        <h2>Skills</h2>
                        <hr></hr>
                        <VerticalTimeline lineColor={"#475466"}>
                            {skills ? (
                                Object.keys(skills)
                                    .reverse()
                                    .map((year) => {
                                        return (
                                            <VerticalTimelineElement
                                                className="vertical-timeline-element"
                                                contentStyle={{
                                                    background: "#475466",
                                                    color: "white",
                                                }}
                                                contentArrowStyle={{
                                                    borderRight:
                                                        "7px solid  #475466",
                                                }}
                                                iconStyle={{
                                                    background: "#102A4F",
                                                    border: "5px #102A4F solid",
                                                }}
                                                date={year}
                                            >
                                                {skills[year].map((skill) => {
                                                    return <>{skill} </>;
                                                })}
                                            </VerticalTimelineElement>
                                        );
                                    })
                            ) : (
                                <></>
                            )}
                        </VerticalTimeline>
                    </div>
                ) : (
                    <LoadingComponent />
                )}
                {loadedProjects ? (
                    <div className="card containers" id="projects">
                        <h2>Projects</h2>
                        <hr></hr>
                        <div class="row">
                            {projects ? (
                                projects.reverse().map((project) => {
                                    return (
                                        <ProjectItem
                                            project={project}
                                        ></ProjectItem>
                                    );
                                    // <p>{project.name}</p>
                                })
                            ) : (
                                <></>
                            )}
                        </div>
                        <Link
                            to="/projects"
                            class="btn"
                            style={{
                                color: "white",
                                background: "#0D1B61",
                                borderRadius: "10px",
                                textDecoration: "none",
                            }}
                        >
                            See more
                        </Link>
                    </div>
                ) : (
                    <LoadingComponent />
                )}
                {loadedExperiences ? (
                    <div className="card containers" id="experience">
                        <h2>Experiences</h2>
                        <hr></hr>
                        <div className="row">
                            {experiences.map((experience) => {
                                return (
                                    <div class="col-sm-6">
                                        <div className="card experienceContainer">
                                            <h4>
                                                {experience.company_name} -{" "}
                                                <i>{experience.title}</i> (
                                                {experience.starting}-
                                                {experience.ending})
                                            </h4>
                                            <ul>
                                                {experience.details.map(
                                                    (detail) => {
                                                        return (
                                                            <li>{detail}</li>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <LoadingComponent />
                )}
            </div>
        </div>
    );
}

export default MainPage;
