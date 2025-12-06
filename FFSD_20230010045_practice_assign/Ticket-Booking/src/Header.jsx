
import { Link } from 'react-router-dom'

function Header() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-link">All Tickets</Link>
        <Link to="/bookings" className="nav-link">My Bookings</Link>
         <Link to="/search" className="nav-link">Search</Link>
      </div>
      
    </nav>
  )
}

export default Header
