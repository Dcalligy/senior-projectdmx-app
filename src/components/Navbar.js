import React, { Component } from 'react'

export default class NavBar extends Component{
    render(){
        return(
            // Header using Bootstrap
            <header role="banner">
              <nav className="navbar navbar-custom">
              <div className="container-fluid">
                <div className="collapse navbar-collapse" id="myNavbar">
                  <div className="navbar-header">
      
                    <ul className="nav navbar-nav">
                      <a className="navbar-brand" href="#"style={{color: 'gray'}}>USF</a>
                      <a className="navbar-brand" href="#">Home</a>
                      <a className="navbar-brand" href="#">Groups</a>
                    </ul>
                  </div>
      
                  <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown" style={{align : 'right'}}>
                      <a className="dropdown-toggle" data-toggle="dropdown" href="#" style={{color : 'white', fontSize : '155%' }}>Login</a>
                      
                      <ul className="dropdown-menu" style={{padding : '5px', width : '100%'}}>
      
                        <form>
      
                          <div className="form-group">
                            <label htmlFor="loginEmail">USF Email:</label><br/>
                            <input type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" placeholder="Enter email" required/>
                          </div>
      
                          <div className="form-group">
                            <label htmlFor="loginPassword">Password:</label>
                            <input type="password" className="form-control" id="loginPassword" placeholder="Password" required/>
                            <button type="submit" className="btn btn-form">Submit</button>
                          </div>
                        </form>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              </nav>  
            </header>
            

            
        );
    }
}