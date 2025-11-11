import { Link } from 'react-router-dom'

function Navbar(props) {
  const favorites = props.favorites
  
  return (
    <nav className="shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-emerald-600">MovieApp</Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/favorites" className="hover:underline">
            Favorites <span className="text-sm text-gray-600">({favorites.length})</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar