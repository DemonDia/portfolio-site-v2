import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./Pages/MainPage";
import ProjectPage from "./Pages/ProjectPage";
import ErrorPage from "./Pages/ErrorPage";
import Navbar from "./Components/Navbar";
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div style = {{marginTop:"50px"}}> 
                    <Routes>
                        <Route exact path="/" element={<MainPage />}></Route>
                        <Route
                            exact
                            path="/projects"
                            element={<ProjectPage />}
                        ></Route>
                        <Route exact path="*" element={<ErrorPage />}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
