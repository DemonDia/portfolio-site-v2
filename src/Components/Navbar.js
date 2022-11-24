import React, { Fragment } from "react";
import { Link } from "react-router-dom";
function Navbar(props) {
    const navigation = [
        { name: "Home", href: "/#home" },
        { name: "Skills", href: "/#skills" },
        { name: "Projects", href: "/#projects" },
        { name: "Experience", href: "/#experience" },
        { name: "Contacts", href: "/#contacts" },
    ];

    return (
        <nav
            class="navbar fixed-top navbar-expand-lg"
            style={{ background: "#253142" }}
        >
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    {/* Navbar */}
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ color: "white" }}
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        {navigation.map((nav) => {
                            console.log(nav);
                            return (
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href={nav.href}
                                        style={{ color: "white" }}
                                    >
                                        {nav.name}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
