import NavBar from "../NavBar";
import "./Forum.css";
import React, { Component } from "react";
import { Routes, Route } from "react-router";
import Landing from "./Landing";

class Forum extends Component {
    render() {
        return (
            <div className="Forum">
                <div className="container">
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                    </Routes>
                </div>
            </div>
        )
    }
}


export default Forum;