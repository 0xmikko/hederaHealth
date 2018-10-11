import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { Button, Carousel } from 'react-bootstrap';
import {login} from  '../../actions/auth'
import {authErrors, isAuthenticated} from '../../reducers'

const Landing = (props) => {

  if(props.isAuthenticated) {
     return  <Redirect to='/' />
     
  }

  return (
      <Carousel>
        <Carousel.Item>
          <img height='70%' alt="900x500" src="/images/loginbg-1920x1280.jpg" />
          <Carousel.Caption>
            <h1 style={{color: 'white'}}>Reduce Risk and Increase ROI for Your Crypto Investments</h1>
            <p>With Tokenstarter - the world's first crowd investing platform based on options</p>
              <Link to={'/signup'}>
                <Button style={{marginBottom: '20px'}}>Sign up now</Button><br />
              </Link>
          </Carousel.Caption>
        </Carousel.Item>
           <Carousel.Item>
          <img width='100%' alt="900x500" src="/images/loginbg-1920x1280.jpg" />
          <Carousel.Caption>
            <h1 style={{color: 'white'}}>Reduce Risk and Increase ROI for Your Crypto Investments</h1>
            <p>With Tokenstarter - the world's first crowd investing platform based on options</p>
          </Carousel.Caption>
        </Carousel.Item>

    </Carousel>
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

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
