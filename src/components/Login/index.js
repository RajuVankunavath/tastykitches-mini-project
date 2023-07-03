import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderAuthUserName = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          id="username"
          className="username-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUserName}
        />
      </>
    )
  }

  renderAuthUserPassword = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          value={password}
          placeholder="password"
          className="password-input"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-app-main-container">
        <img
          src="https://res.cloudinary.com/dkobk5oao/image/upload/v1633587041/Rectangle_1457_xkvsxy.png"
          className="login-mobile-image"
          alt="website logo"
        />
        <div className="login-card-container">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <img
              src="https://res.cloudinary.com/dkobk5oao/image/upload/v1633608363/Frame_274_mqin4h.png"
              className="login-desktop-image"
              alt="website logo"
            />
            <h1 className="logo-heading">Tasty Kitchens</h1>
            <h1 className="login-heading">Login</h1>
            <div className="input-container">{this.renderAuthUserName()}</div>
            <div className="input-container">
              {this.renderAuthUserPassword()}
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
        <img
          src="https://res.cloudinary.com/dxdhyib3l/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1687094682/cld-sample-4_itxgmd.jpg"
          className="login-image"
          alt="website login"
        />
      </div>
    )
  }
}

export default Login
