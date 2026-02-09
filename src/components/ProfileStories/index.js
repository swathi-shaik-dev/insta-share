import './index.css'

const ProfileStories = props => {
  const {storyImg} = props
  return (
    <li className="story-item">
      <img className="story-image" alt="my story" src={storyImg} />
    </li>
  )
}

export default ProfileStories
