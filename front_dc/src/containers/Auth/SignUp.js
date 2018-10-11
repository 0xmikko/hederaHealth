import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { signup } from '../../actions/auth'
import { authErrors, isAuthenticated, signupSuccess } from '../../reducers/index'
import SignUpForm from '../../components/Auth/SignUpForm'
import {SIGNUP_SUCCESS_RESET} from "../../actions/actions";


const SignUp = (props) => {

  if (props.isAuthenticated) return  <Redirect to='/' />
  if (props.signupSuccess === true) {
      props.resetSignUp();
      return <Redirect to='/login/' />
  }
  console.log("SP2", props.signupSuccess)

  return <div className="login-page">
            <SignUpForm {...props}/>
        </div>

}

const mapStateToProps = (state) => ({
  errors: authErrors(state),
  isAuthenticated: isAuthenticated(state),
  signupSuccess : signupSuccess(state)
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (username, password) => dispatch(signup(username, password)),
  resetSignUp: () => dispatch({type: SIGNUP_SUCCESS_RESET})

})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
