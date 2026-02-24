import {Link} from 'react-router-dom'
import {Component} from 'react'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import Cookies from 'js-cookie'
import './index.css'

class PostItem extends Component {
  state = {isLiked: false, likesCount: 0}

  componentDidMount() {
    const {postDetails} = this.props
    this.setState({likesCount: postDetails.likesCount})
  }

  toggleLike = async () => {
    const {postDetails} = this.props
    const {isLiked} = this.state
    const jwtToken = Cookies.get('jwt_token')

    await fetch(
      `https://apis.ccbp.in/insta-share/posts/${postDetails.postId}/like`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({like_status: !isLiked}),
      },
    )

    this.setState(prev => ({
      isLiked: !prev.isLiked,
      likesCount: prev.isLiked ? prev.likesCount - 1 : prev.likesCount + 1,
    }))
  }

  render() {
    const {postDetails} = this.props
    const {isLiked, likesCount} = this.state

    return (
      <li className="post-item" data-testid="postItem">
        <div className="profile-container">
          <img
            src={postDetails.profilePic}
            alt="post author profile"
            className="profile-pic"
          />
          <Link className="link" to={`/users/${postDetails.userId}`}>
            <p className="profile-name">{postDetails.userName}</p>
          </Link>
        </div>

        <img
          src={postDetails.postDetails.image_url}
          alt="post"
          className="post-image"
        />

        <div className="icons-container">
          {isLiked ? (
            <FcLike
              testid="unLikeIcon"
              onClick={this.toggleLike}
              className="icon"
            />
          ) : (
            <BsHeart
              testid="likeIcon"
              onClick={this.toggleLike}
              className="icon"
            />
          )}

          <FaRegComment className="icon" />

          <BiShareAlt className="icon" />
        </div>

        <p className="likes">{likesCount} likes</p>
        <p className="caption">{postDetails.postDetails.caption}</p>
        {postDetails.comments.map(each => (
          <p className="comment-name" key={each.user_id}>
            {each.user_name}
            <span className="comment">{each.comment}</span>
          </p>
        ))}
        <p className="time">{postDetails.createdAt}</p>
      </li>
    )
  }
}

export default PostItem
