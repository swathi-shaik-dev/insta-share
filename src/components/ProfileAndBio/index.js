import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import './index.css'

const ProfileAndBio = props => {
  const {profile, isMyProfile} = props
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
      <div className="top-section-mobile">
        <h1 className="user-name">{userName}</h1>
        <div className="img-stats">
          <img
            className="bio-pic"
            alt={isMyProfile ? 'my profile' : 'user profile'}
            src={profilePic}
          />
          <div className="stats-container">
            <div className="stats">
              <p className="total-count">{postsCount}</p>
              <p className="tag">posts</p>
            </div>

            <div className="stats">
              <p className="total-count">{followersCount}</p>
              <p className="tag">followers</p>
            </div>

            <div className="stats">
              <p className="total-count">{followingCount}</p>
              <p className="tag">following</p>
            </div>
          </div>
        </div>
        <p className="user-id">{userId}</p>
        <p className="user-bio">{userBio}</p>
      </div>
      <div className="top-section">
        <img
          className="bio-pic"
          alt={isMyProfile ? 'my profile' : 'user profile'}
          src={profilePic}
        />
        <div className="bio-container">
          <h1 className="user-name">{userName}</h1>
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
          <li key={each.id} className="story-item">
            <img
              className="story-image"
              alt={isMyProfile ? 'my story' : 'user story'}
              src={each.image}
            />
          </li>
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
            <li key={each.id} className="post-card">
              <img
                className="post-img"
                alt={isMyProfile ? 'my post' : 'user post'}
                src={each.image}
              />
            </li>
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
