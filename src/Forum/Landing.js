import React, { Component } from "react";
import http from "./services/httpService";
import { jwtDecode } from "jwt-decode";
import { api } from "./config.js";
import Discussions from "./Discussions";
import Chatbox from "./Chatbox.js";

class Landing extends Component {
    state = {};
    async componentDidMount() {
        try {
            const jwt = localStorage.getItem("token");
            const user_jwt = jwtDecode(jwt);
            const user = await http.get(`${api.usersEndPoint}${user_jwt._id}`);
            this.setState({ user: user.data });
        } catch (ex) { }
    }
    render() {
        return (
            <div className="">
                <div className="d-flex flex-column align-items-center">
                    
                    <h2>
                        Welcome to the T-ester Forum!
                    </h2>
                    <p>
                        Here you can post and discuss any manner of topics related to testing Chromebooks.
                    </p>
                    <div className="">
                        <button type="button" className="btn btn-primary m-1">
                            Log In
                        </button>
                        <button type="button" className="btn btn-primary m-1">
                            Sign Up
                        </button>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-8">
                        <Discussions />
                    </div>
                    <div className="col-4">
                        <Chatbox />
                    </div>
                </div>
            </div>
        )
    }
}


export default Landing;