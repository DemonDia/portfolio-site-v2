import React, { useState, useEffect } from "react";
import axios from "axios";
function MainPage() {
    const [skills, setSkills] = useState(null);
    const [projects, setProjects] = useState([]);
    const [experiences, setExperiences] = useState([]);
    // get the data
    const getSklls = async () => {
        await axios
            .get(process.env.REACT_APP_BACKEND_API + "/skills")
            .then((res) => {
                if (res.data.success) {
                    const fetchedSkills = res.data.data;
                    var skillDict = {}
                    fetchedSkills.map((skill) => {
                        if (skillDict.hasOwnProperty(skill.year_learnt)){
                            skillDict[skill.year_learnt].push(skill.name)
                        }
                        else{
                            skillDict[skill.year_learnt] = [skill.name]   
                        }
                    });
                    for( var skill in skillDict){
                        console.log(skill)

                    }
                    setSkills(skillDict)
                    // skillDict.map((value,key)=>{
                    //     console.log("value",value)
                    //     console.log("key",key)
                    // })
                    // console.log("skill dict:",skillDict)
                }
            });
    };
    const getProjects = async () => {
        await axios
            .get(process.env.REACT_APP_BACKEND_API + "/projects")
            .then((res) => {
                if (res.data.success) {
                    console.log("projects", res.data.data);
                    setProjects(res.data.data);
                }
            });
    };
    const getExperiences = async () => {
        await axios
            .get(process.env.REACT_APP_BACKEND_API + "/experiences")
            .then((res) => {
                if (res.data.success) {
                    console.log("experience", res.data.data);
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
                    {
                        skills?
                    Object.keys(skills).map((year)=>{
                        return(
                            <h1>
                                {year}:{skills[year]}
                            </h1>
                        )
                    }):<></>}
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
