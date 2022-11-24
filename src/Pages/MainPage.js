import React, { useState, useEffect } from "react";
import axios from "axios";
function MainPage() {
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [experiences, setExperiences] = useState([]);
    // get the data
    const getSklls = async () => {
        await axios
            .get(process.env.REACT_APP_BACKEND_API + "/skills")
            .then((res) => {
                if(res.data.success){
                    console.log("skills",res.data.data)
                    setSkills(res.data.data)
                }
            });
    };
    const getProjects = async () => {
        await axios
            .get(process.env.REACT_APP_BACKEND_API + "/projects")
            .then((res) => {
                if(res.data.success){
                    console.log("projects",res.data.data)
                    setProjects(res.data.data)
                }
            });
    };
    const getExperiences = async () => {
        await axios
            .get(process.env.REACT_APP_BACKEND_API + "/experiences")
            .then((res) => {
                if(res.data.success){
                    console.log("experience",res.data.data)
                    setExperiences(res.data.data)
                }
            });
    };
    useEffect(() => {
        getSklls();
        getProjects();
        getExperiences();
    }, []);
    return (
        <div>
            <div>
                <div className="card containers">
                    <h2>About me</h2>
                </div>
                <div className="card containers">
                    <h2>Skills</h2>
                </div>
                <div className="card containers">
                    <h2>Projects</h2>
                </div>
                <div className="card containers">
                    <h2>Experiences</h2>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
