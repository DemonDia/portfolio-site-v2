import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./Pages/MainPage";
import ProjectPage from "./Pages/ProjectPage";
import ErrorPage from "./Pages/ErrorPage";
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<MainPage />}></Route>
                    <Route
                        exact
                        path="/projects"
                        element={<ProjectPage />}
                    ></Route>
                    <Route exact path="*" element={<ErrorPage />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
