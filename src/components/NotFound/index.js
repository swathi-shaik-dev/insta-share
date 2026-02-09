import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="container">
    <img
      src="https://res.cloudinary.com/dmuosjfgv/image/upload/v1770552993/erroring_1_zturqe.png"
      alt="page not found"
      className="nf-img"
    />
    <h1 className="fail-desc">Page Not Found</h1>
    <p className="nf-desc">
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="home-btn" type="button">
        Home page
      </button>
    </Link>
  </div>
)

export default NotFound
