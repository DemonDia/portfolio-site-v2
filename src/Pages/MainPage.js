import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import ProjectItem from "../Components/ProjectItem";

function MainPage() {
    const [skills, setSkills] = useState(null);
    const [projects, setProjects] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [currentSkillYear, setSkillYear] = useState(0);
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
                    setSkillYear(
                        Object.keys(skillDict)[
                            Object.keys(skillDict).length - 1
                        ]
                    );
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
                    console.log("projects", fetchedProjects);
                    setProjects(fetchedProjects);
                }
            });
    };
    const getExperiences = async () => {
        await axios
            .get(process.env.REACT_APP_BACKEND_API + "/experiences")
            .then((res) => {
                if (res.data.success) {
                    setExperiences(res.data.data);
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
            <div>
                <div className="card containers">
                    <h2>About me</h2>
                </div>
                <div className="card containers">
                    <h2>Skills</h2>
                    <VerticalTimeline lineColor={"#475466"}>
                        {skills ? (
                            Object.keys(skills)
                                .reverse()
                                .map((year) => {
                                    // console.log(currSkills[year])
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
                                                return <p>{skill}</p>;
                                            })}
                                        </VerticalTimelineElement>
                                    );
                                })
                        ) : (
                            <></>
                        )}
                    </VerticalTimeline>
                </div>
                <div className="card containers">
                    <h2>Projects</h2>
                    <div class = "row">
                        {projects ? (
                            projects.reverse().map((project) => {
                                console.log(project);
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
                </div>
                <div className="card containers">
                    <h2>Experiences</h2>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
