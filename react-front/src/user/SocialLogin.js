import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { socialLogin, authenticate } from "../auth";
 
class SocialLogin extends Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false,
        };
    }
 
    responseGoogle = response => {
        console.log(response);
        const { googleId, name, email, imageUrl } = response.profileObj;
        const user = {
            password: googleId,
            name: name,
            email: email,
            imageUrl: imageUrl
        };
        // console.log("user obj to social login: ", user);
        socialLogin(user).then(data => {
            console.log("signin data: ", data);
            if (data.error) {
                console.log("Error Login. Please try again..");
            } else {
                console.log("signin success - setting jwt: ", data);
                //console.log(data);
                if (data.status === 1)
                {
                    this.props.getTags(true, data);
                }
                else if (data.status === 2)
                {
                    authenticate(data, () => {
                        this.setState({ redirectToReferrer: true });
                    });
                }

            }
        });
    };
 
    render() {
        // redirect
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return <Redirect to="/" />;
        }
 
        return (
            <GoogleLogin
                clientId="969499957725-vbroip9gu18ob9e2g8h3u6m5gsb89pu5.apps.googleusercontent.com"
                buttonText="Sign In with Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
            />
        );
    }
}
 
export default SocialLogin;
