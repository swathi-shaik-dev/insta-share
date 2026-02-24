import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import {FiMenu} from 'react-icons/fi'
import {IoIosCloseCircle} from 'react-icons/io'

import './index.css'

class Header extends Component {
  state = {displayMenu: false, searchValue: ''}

  onClickMenu = () => {
    this.setState({displayMenu: true})
  }

  onClickClose = () => {
    this.setState({displayMenu: false})
  }

  onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onEnterCaption = event => {
    this.setState({searchValue: event.target.value})
  }

  onSearchPosts = () => {
    const {searchValue} = this.state
    const {history} = this.props
    history.push(`/search?query=${searchValue}`)
  }

  render() {
    const {displayMenu, searchValue} = this.state
    return (
      <>
        <nav className="navbar">
          <div className="header">
            <div className="logo-container">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dmuosjfgv/image/upload/v1769322019/logo_ykzeki.jpg"
                  alt="website logo"
                  className="nav-img"
                />
              </Link>
              <h1 className="logo-name">Insta Share</h1>
            </div>
            <div data-testid="searchIcon">
              <FiMenu className="menu-icon" onClick={this.onClickMenu} />
            </div>
          </div>
          {displayMenu && (
            <div className="menu-display">
              <ul className="nav-section">
                <li>
                  <Link to="/" className="link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/search" className="link">
                    Search
                  </Link>
                </li>
                <li>
                  <Link to="/my-profile" className="link">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="logout-btn"
                    type="button"
                    onClick={this.onLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
              <div data-testid="closeIcon">
                <IoIosCloseCircle
                  className="close-icon"
                  onClick={this.onClickClose}
                />
              </div>
            </div>
          )}
        </nav>
        <nav className="navbar-md">
          <div className="header">
            <div className="logo-container">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dmuosjfgv/image/upload/v1769322019/logo_ykzeki.jpg"
                  alt="website logo"
                  className="nav-img"
                />
              </Link>
              <h1 className="logo-name">Insta Share</h1>
            </div>
            <ul className="nav-items">
              <li className="search-container">
                <input
                  className="search-input"
                  type="search"
                  placeholder="Search Caption"
                  onChange={this.onEnterCaption}
                  value={searchValue}
                />
                <button
                  data-testid="searchIcon"
                  onClick={this.onSearchPosts}
                  type="button"
                  className="search-btn"
                >
                  <FaSearch className="search-icon" />
                </button>
              </li>
              <li>
                <Link to="/" className="link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/my-profile" className="link">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  className="logout-btn"
                  type="button"
                  onClick={this.onLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </>
    )
  }
}

export default withRouter(Header)
