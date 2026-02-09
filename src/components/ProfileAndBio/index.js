import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import ProfileStories from '../ProfileStories'
import PostCard from '../PostCard'

import './index.css'

const ProfileAndBio = props => {
  const {profile} = props
  const {
    posts,
    stories,
    profilePic,
    userName,
    postsCount,
    followersCount,
    followingCount,
    userBio,
    userId,
  } = profile
  return (
    <div className="my-profile-container">
      <div className="top-section">
        <img className="bio-pic" alt="user profile" src={profilePic} />
        <div className="bio-container">
          <h1 className="no-posts">{userName}</h1>
          <div className="stats-container">
            <p className="total-count">
              {postsCount}
              <span className="tag">posts</span>
            </p>

            <p className="total-count">
              {followersCount}
              <span className="tag">followers</span>
            </p>

            <p className="total-count">
              {followingCount}
              <span className="tag">following</span>
            </p>
          </div>
          <p className="user-id">{userId}</p>
          <p className="user-bio">{userBio}</p>
        </div>
      </div>
      <ul className="stories-container">
        {stories.map(each => (
          <ProfileStories key={each.id} storyImg={each.image} />
        ))}
      </ul>
      <hr className="separator" />
      <div className="post-icon-container">
        <BsGrid3X3 className="grid" />
        <h1 className="post-hd">Posts</h1>
      </div>
      {posts.length ? (
        <ul className="post-container">
          {posts.map(each => (
            <PostCard key={each.id} postImg={each.image} />
          ))}
        </ul>
      ) : (
        <div className="no-posts-view">
          <div className="cam-container">
            <BiCamera className="cam-icon" />
          </div>
          <h1 className="no-posts">No Posts Yet</h1>
        </div>
      )}
    </div>
  )
}

export default ProfileAndBio
