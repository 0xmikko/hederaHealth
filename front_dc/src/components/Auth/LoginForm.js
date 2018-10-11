import React, { Component } from 'react'
import { Link } from "react-router-dom"

import { Alert, Button, Form, Panel } from 'react-bootstrap';
import TextField from './TextField'
import './LoginForm.css'

export default class LoginForm extends Component {
  state = {
    username: '',
    password: ''
  }

  handleInputChange = (event) => {
    const target = event.target,
          value = target.type === 
            'checkbox' ? target.checked : target.value,
          name = target.name
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state.username, this.state.password)
  }

  render() {
    const errors = this.props.errors || {}
    return (


    <React.Fragment>
   

      <Panel className={'login-panel'}>
            <h2 className={'welcome-text'}>Log into Tokenstarter</h2>

            <Form onSubmit={this.onSubmit}>
            
              {
              errors.non_field_errors?
                <Alert color="danger">
                    {errors.non_field_errors}
                </Alert>:""
              }
              <TextField name="username" 
                        placeholder="E-mail" 
                        error={errors.username}
                        onChange={this.handleInputChange} 
                        className="login-input"
                        />

              <TextField name="password"
                        placeholder="Password" 
                        error={errors.password} type="password"  
                        onChange={this.handleInputChange} 
                        className="login-input" />

              <Button type="submit"
                      size="lg"
                      bsStyle="primary"
                      style={{minWidth: '100px'}}  >
                 SIGN IN
              </Button>&nbsp;&nbsp;

                <h5>New to Tokenstarter? &nbsp;
                 <Link to={'/signup/'}>

                      Sign Up
              </Link>
                </h5>


            </Form>
    </Panel>
          

</React.Fragment>
      
    )
  }
}