import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import PostItem from '../PostItem'
import Stories from '../Stories'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {status: apiStatus.initial, posts: []}

  componentDidMount() {
    this.getPosts()
  }

  getPosts = async () => {
    this.setState({status: apiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        postDetails: each.post_details,
        likesCount: each.likes_count,
        comments: each.comments,
        createdAt: each.created_at,
      }))
      this.setState({posts: updatedData, status: apiStatus.success})
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
      <h1 className="fail-desc">Something went wrong. Please try again</h1>
      <button className="retry-btn" type="button" onClick={this.getProfile}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div testid="loader" className="container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderHome = () => {
    const {posts} = this.state
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="slick">
            <Stories />
          </div>
          <hr className="hr-line" />
          <ul className="posts-container">
            {posts.map(each => (
              <PostItem key={each.postId} postDetails={each} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {status} = this.state
    switch (status) {
      case apiStatus.loading:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderHome()
      case apiStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }
}

export default Home
