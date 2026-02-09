import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitDetails = async event => {
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
    if (response.ok === true) {
      console.log(data.jwt_token)
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showError, errorMsg, username, password} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <img
          alt="website login"
          src="https://res.cloudinary.com/dmuosjfgv/image/upload/v1769321655/Illustration_xlnbp3.jpg"
          className="login-blog"
        />
        <form onSubmit={this.onSubmitDetails} className="form-container">
          <img
            className="app-logo"
            alt="website logo"
            src="https://res.cloudinary.com/dmuosjfgv/image/upload/v1769322019/logo_ykzeki.jpg"
          />
          <h1 className="form-title">Insta Share</h1>
          <div className="input-label-container">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              className="input"
              id="username"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-label-container">
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              className="input"
              id="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          {showError && <p className="error-msg">{errorMsg}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
