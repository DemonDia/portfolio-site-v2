import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import ProjectItem from "../Components/ProjectItem";
import { Link } from "react-router-dom";

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
                    <p style={{ textAlign: "left" }}>
                        &nbsp; &nbsp; &nbsp;My name is Siang Meng and I am a 3rd
                        yearInformation Systems student in SMU. I am aspiring to
                        be a software engineer (espeically in startups) when I
                        graduate.
                        <br></br>
                        &nbsp; &nbsp; &nbsp;Ever since I was young, I have been
                        very fascinated with technology. When I was in secondary
                        school, my passion in technology led me to join the
                        Robotics Club of my secondary school. However, before I
                        graduated from Secondary school, my interests shifted
                        towards coding, which led me to take Computing as a
                        subject in Junior College (JC), where I learnt how to
                        self-learn and experiment other coding content outside
                        of school. Fast forward, both my self-learning and
                        passion grew as I entered SMU. This resulted in me
                        picking up various Javascript frameworks which I learnt
                        until now. After some time, I found myself working in a
                        startup (Shoutout to{" "}
                        <a
                            target={"_blank"}
                            href="https://floramis.com/"
                            style={{ color: "white" }}
                        >
                            Floramis
                        </a>
                        ), which eventually helped me to open more doors.
                        <br></br>
                        &nbsp; &nbsp; &nbsp;After the second semester of my
                        second year in SMU and my summer internship, I have further improved my skillsets
                        and practices which I never knew before, and this has further strengthened my thirst in learning.
                        <br></br>
                        Here are the following traits that I have:
                        <ul>
                            <li>Self-driven</li>
                            <li>Team-player</li>
                            <li>Detail-oriented</li>
                            <li>Adaptable</li>
                        </ul>
                        Here are my folloing hobbies I have aside from coding:
                        <ul>
                            <li>Going to the gym to lift weights</li>
                            <li>Watching anime/web series on YouTube</li>
                            <li>Listening to songs (Especially from D4DJ)</li>
                            <li>Playing mobile games</li>
                        </ul>
                    </p>
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
                <div className="card containers">
                    <h2>Projects</h2>
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
                <div className="card containers">
                    <h2>Experiences</h2>
                    {experiences.map((experience) => {
                        console.log(experience);
                        return (
                            <div className="card experienceContainer">
                                <h4>
                                    {experience.company_name} -{" "}
                                    <i>{experience.title}</i> (
                                    {experience.starting}-{experience.ending})
                                </h4>
                                <ul>
                                    {experience.details.map((detail) => {
                                        return <li>{detail}</li>;
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default MainPage;
