import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
}

class Stories extends Component {
  state = {status: apiStatus.initial, userStories: []}

  componentDidMount() {
    this.getStories()
  }

  getStories = async () => {
    this.setState({status: apiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.users_stories.map(each => ({
        userId: each.user_id,
        userName: each.user_name,
        storyUrl: each.story_url,
      }))
      this.setState({userStories: updatedData, status: apiStatus.success})
    } else if (response.status === 401) {
      this.setState({status: apiStatus.failure})
    }
  }

  renderLoadingView = () => (
    <div className="load-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {userStories} = this.state
    return (
      <Slider {...settings}>
        {userStories.map(each => {
          const {userId, userName, storyUrl} = each
          return (
            <li key={userId}>
              <div className="story-container">
                <img className="story-img" alt="user story" src={storyUrl} />
                <p className="story-user-name">{userName}</p>
              </div>
            </li>
          )
        })}
      </Slider>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dmuosjfgv/image/upload/v1770545709/Group_7522_gwjh2z.png"
        alt="failure view"
        className="fail-img"
      />
      <p className="desc">Something went wrong. Please try again</p>
      <button type="button" onClick={this.getStories} className="retry-btn">
        Try again
      </button>
    </div>
  )

  render() {
    const {status} = this.state
    switch (status) {
      case apiStatus.loading:
        return this.renderLoadingView()
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default Stories
