import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import PostItem from '../PostItem'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchResults extends Component {
  state = {
    status: apiStatus.initial,
    searchedPosts: [],
    searchValue: '',
    show: true,
  }

  componentDidMount() {
    this.syncSearchFromURL()
  }

  componentDidUpdate(prevProps) {
    const {location} = this.props
    const {location: prevLocation} = prevProps
    if (prevLocation.search !== location.search) {
      this.syncSearchFromURL()
    }
  }

  syncSearchFromURL = () => {
    const {location} = this.props
    const {search} = location
    const params = new URLSearchParams(search)
    const query = params.get('query')
    if (query) {
      this.setState({searchValue: query}, this.getSearchedPosts)
    }
  }

  getSearchedPosts = async () => {
    this.setState({status: apiStatus.loading, show: false})
    const jwtToken = Cookies.get('jwt_token')
    const {searchValue} = this.state
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
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
      this.setState({searchedPosts: updatedData, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  onMobileSearch = event => {
    this.setState({searchValue: event.target.value})
  }

  renderFailure = () => (
    <div className="container">
      <img
        src="https://res.cloudinary.com/dmuosjfgv/image/upload/v1770545709/Group_7522_gwjh2z.png"
        alt="failure view"
        className="fail-img"
      />
      <h1 className="fail-desc">Something went wrong. Please try again</h1>
      <button
        className="retry-btn"
        type="button"
        onClick={this.getSearchedPosts}
      >
        Try again
      </button>
    </div>
  )

  renderLoader = () => (
    <div testid="loader" className="container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSearchedPosts = () => {
    const {searchedPosts} = this.state
    const noResults = searchedPosts.length === 0
    return (
      <div className="search-results-container">
        {noResults ? (
          <div className="container">
            <img
              src="https://res.cloudinary.com/dmuosjfgv/image/upload/v1770556500/Group_h8phuy.png"
              alt="search not found"
              className="fail-img"
            />
            <h1 className="nf-hd">Search Not Found</h1>
            <p className="nf-desc">Try different keyword or search again</p>
          </div>
        ) : (
          <>
            <h1 className="search-results">Search Results</h1>
            <ul className="search-posts-container">
              {searchedPosts.map(each => (
                <PostItem key={each.postId} postDetails={each} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }

  renderPage = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.loading:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderSearchedPosts()
      case apiStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {searchValue, show} = this.state
    return (
      <>
        <Header />
        <div className="mobile-search-view">
          <input
            placeholder="Search Caption"
            className="search-input"
            type="search"
            value={searchValue}
            onChange={this.onMobileSearch}
          />
          <button
            onClick={this.getSearchedPosts}
            type="button"
            className="search-btn"
          >
            <FaSearch className="search-icon" />
          </button>
        </div>
        {show && (
          <div className="search-message">
            <img
              className="search-msg-icon"
              alt="search"
              src="https://res.cloudinary.com/dmuosjfgv/image/upload/v1770809791/Frame_1473_pckgra.png"
            />
            <h1 className="message">Search Results will be appear here</h1>
          </div>
        )}

        {this.renderPage()}
      </>
    )
  }
}

export default SearchResults
