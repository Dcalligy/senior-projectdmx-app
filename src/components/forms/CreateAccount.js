import React, { Component } from 'react';
import Validate from "../utility/FormValidation";
import { Auth } from 'aws-amplify';
import FormErrors from '../FormErrors';

class CreateAccount extends Component{
    state = {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        errors:{
            cognito: null,
            blankField: false,
            passwordMatch: false
        }
    }

    clearErrorState = () => {
        this.setState({
            errors:{
                cognito: null,
                blankField: false,
                passwordMatch: false 
            }
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        // Form validation
        this.clearErrorState();
        const error = Validate(event, this.state);
        if(error){
            this.setState({
                errors: { ...this.state.errors, ...error }
            });
        }
        
        // AWS Cognito here
        const { username, email, password } = this.state;
        try{
            const signUpResponse = await Auth.signUp({
                username,
                password,
                attributes: {
                    email             // optional
                    // Other custom attributes...
                },
                validationData: [],  // optional
                })
                .then(data => console.log(data))
                .catch(err => console.log(err));
                console.log(signUpResponse);
                this.props.history.push("/Groups");
        } catch(error){
            let err = null;
            !error.message ? err = { "message" : error } : err = error;
            this.setState({
                errors:{
                    ...this.state.errors,
                    cognito: err
                }
            });
        }
        
    };

    onInputChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        document.getElementById(event.target.id).classList.remove("is-danger");
    }

    render(){
        return(
            <article>
          <section className="section auth">
          <div className="container">
          <h1>Create and Account</h1>
                    <FormErrors formErrors={this.state.errors}/>

                    <form onSubmit={this.handleSubmit}>
                        <div className="username">
                            <label htmlFor="username">Username: </label>
                            <input
                                className="input"
                                placeholder="Enter username"
                                type="text "
                                id="username"
                                value={this.state.username}
                                onChange={this.onInputChange}
                            />
                        </div>
                        
                        <div className="email">
                            <label htmlFor="email">Email:</label>
                            <input
                                className="input"
                                placeholder="Enter email"
                                type="email"
                                id="email"
                                value={this.state.email}
                                onChange={this.onInputChange}
                            />
                        </div>

                        <div className="firstName">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                className="input"
                                placeholder="First Name"
                                type="text"
                                id="firstName"
                                value={this.state.firstName}
                                onChange={this.onInputChange}
                            />
                        </div>

                        <div className="lastName">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                className="input"
                                placeholder="Last Name"
                                type="text"
                                id="lastName"
                                value={this.state.lastName}
                                onChange={this.onInputChange}
                            />
                        </div>

                        <div className="password">
                            <label htmlFor="password">Enter a Password:</label>
                            <input
                                className="input"
                                placeholder="Enter a Password"
                                type="password"
                                id="password"
                                value={this.state.password}
                                onChange={this.onInputChange}
                            />
                        </div>

                        <div className="confirmPassword">
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                className="password"
                                placeholder="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.onInputChange}
                            />
                        </div>

                        <div className="field">
                            <button type="submit" className="btn btn-custom">Submit</button>
                        </div>
                    </form>
                </div>
            </section>
            </article>
        );
    }
}
export default CreateAccount;