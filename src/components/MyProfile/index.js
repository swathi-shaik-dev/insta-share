import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProfileAndBio from '../ProfileAndBio'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {status: apiStatus.initial, profile: {}}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({status: apiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const profileData = data.profile
      const updatedData = {
        id: profileData.id,
        userId: profileData.user_id,
        userName: profileData.user_name,
        profilePic: profileData.profile_pic,
        followersCount: profileData.followers_count,
        followingCount: profileData.following_count,
        userBio: profileData.user_bio,
        posts: profileData.posts,
        postsCount: profileData.posts_count,
        stories: profileData.stories,
      }
      this.setState({status: apiStatus.success, profile: updatedData})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderFailure = () => (
    <div className="container">
      <img
        src="https://res.cloudinary.com/dmuosjfgv/image/upload/v1770545709/Group_7522_gwjh2z.png"
        alt="failure view"
        className="fail-img"
      />
      <p className="fail-desc">Something went wrong. Please try again</p>
      <button className="retry-btn" type="button" onClick={this.getProfile}>
        Try again
      </button>
    </div>
  )

  renderLoader = () => (
    <div testid="loader" className="container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderProfile = () => {
    const {profile} = this.state
    return <ProfileAndBio profile={profile} isMyProfile />
  }

  renderPage = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.loading:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderProfile()
      case apiStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderPage()}
      </>
    )
  }
}

export default MyProfile
