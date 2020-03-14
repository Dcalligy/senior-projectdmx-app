import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from 'aws-amplify';

class LogIn extends Component {
  state = {
    username: "",
    password: "",
    errors: {
      cognito: null,
      blankField: false
    }
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankField: false
      }
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    const {username, password} = this.state;
    try{
        const user = await Auth.signIn(username, password)
            .then(user => console.log(user))
            .catch(err => console.log(err));
        console.log(user);
        this.props.history.push("/");
    } catch(error){
        let err = null;
        !error.message ? err = { "message" : error } : err = error;
        this.setState({
            errors:{
                ...this.state.errors,
                cognito: err
            }
        }); 
    };
}

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <FormErrors FormErrors={this.state.errors} />
          <ul className="dropdown-menu" style={{padding : '5px', width : '100%'}}>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label htmlFor="userName">USF Email:</label>
                <input 
                  className="input" 
                  type="email"
                  id="email"
                  aria-describedby="usernameHelp"
                  placeholder="Enter email"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
                <input 
                  className="input" 
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
            </div>
            <div className="field">
              <p className="control">
                <button type="submit" className="btn btn-custom">Submit</button>
              </p>
            </div>
          </form>
          </ul>
        </div>
      </section>
    );
  }
}

export default LogIn;