import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  // Username మార్పులను హ్యాండిల్ చేయడానికి
  onEnterUsername = event => {
    this.setState({username: event.target.value})
  }

  // Password మార్పులను హ్యాండిల్ చేయడానికి
  onEnterPassword = event => {
    this.setState({password: event.target.value})
  }

  // లాగిన్ సక్సెస్ అయితే
  handleLoginSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  // లాగిన్ ఫెయిల్ అయితే
  handleLoginFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  // ఫామ్ సబ్మిట్ లాజిక్
  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const loginDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(loginDetails),
    }

    const apiResponse = await fetch(apiUrl, requestOptions)
    const responseData = await apiResponse.json()

    if (apiResponse.ok) {
      this.handleLoginSuccess(responseData.jwt_token)
    } else {
      this.handleLoginFailure(responseData.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <div className='input-container'>
        <label className='input-label' htmlFor='password'>
          PASSWORD
        </label>
        <input
          type='password'
          id='password'
          className='password-input-field'
          value={password}
          onChange={this.onEnterPassword}
          placeholder='Password'
        />
      </div>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <div className='input-container'>
        <label className='input-label' htmlFor='username'>
          USERNAME
        </label>
        <input
          type='text'
          id='username'
          className='username-input-field'
          value={username}
          onChange={this.onEnterUsername}
          placeholder='Username'
        />
      </div>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const userToken = Cookies.get('jwt_token')

    // యూజర్ ఆల్రెడీ లాగిన్ అయి ఉంటే హోమ్ పేజీకి పంపాలి
    if (userToken !== undefined) {
      return <Redirect to='/' />
    }

    return (
      <div className='login-form-container'>
        <img
          src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'
          className='login-website-logo-mobile-img'
          alt='website logo'
        />
        <img
          src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png'
          className='login-img'
          alt='website login'
        />
        <form className='form-container' onSubmit={this.onFormSubmit}>
          <img
            src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'
            className='login-website-logo-desktop-img'
            alt='website logo'
          />
          {this.renderUsernameField()}
          {this.renderPasswordField()}
          <button type='submit' className='login-button'>
            Login
          </button>
          {showSubmitError && <p className='error-message'>*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
