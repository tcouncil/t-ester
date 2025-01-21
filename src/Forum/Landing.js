import React, { Component } from "react";
import http from "./services/httpService";
import { jwtDecode } from "jwt-decode";
import { api } from "./config.js";
import Discussions from "./Discussions";
import Chatbox from "./Chatbox.js";

class Landing extends Component {
    state = {
        isLoggedIn: false,
    };
    async componentDidMount() {
        try {
            const jwt = localStorage.getItem("token");
            const user_jwt = jwtDecode(jwt);
            const user = await http.get(`${api.usersEndPoint}${user_jwt._id}`);
            this.setState({ user: user.data });
            this.setState({ isLoggedIn: true });
        } catch (ex) {
            // Handle errors (optional)
        }
    }
    render() {
        const { isLoggedIn } = this.state;

        return (
            <div className="">
                <div className="d-flex flex-column align-items-center">

                    <h2>
                        Welcome to the T-ester Forum!
                    </h2>
                    <p>
                        Here you can post and discuss any manner of topics related to testing Chromebooks.
                    </p>
                    {!isLoggedIn ?
                        <div className="">

                            <button type="button" className="btn btn-primary m-1">
                                Log In
                            </button>
                            <a href="./#register">
                                <button type="button" className="btn btn-primary m-1">
                                    Sign Up
                                </button>
                            </a>
                        </div>
                        :
                        <button type="button" className="btn btn-primary m-1">
                            Log Out
                        </button>
                    }
                </div>

                <hr />

                {isLoggedIn && (
                    <div className="row">
                        <div className="col-8">
                            <Discussions />
                        </div>
                        <div className="col-4">
                            <Chatbox />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}


export default Landing;