import React from 'react'
import { connect } from 'react-redux'

import LoginForm from '../../components/Auth/LoginForm'
import {login} from '../../actions/auth'
import {authErrors, isAuthenticated} from '../../reducers/index'

import "./Auth.css"

const Login = (props) => {

  return (
       <LoginForm {...props}/>
  )
}

const mapStateToProps = (state) => ({
  errors: authErrors(state),
  isAuthenticated: isAuthenticated(state)
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (username, password) => {
    dispatch(login(username, password))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
