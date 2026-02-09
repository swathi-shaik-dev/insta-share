import './index.css'

const PostCard = props => {
  const {postImg} = props
  return (
    <li className="post-card">
      <img className="post-img" alt="my post" src={postImg} />
    </li>
  )
}

export default PostCard
