import { Link } from 'react-router-dom'

function MovieCard(props) {

  const movie = props.movie
  const addFavorite = props.addFavorite
  const removeFavorite = props.removeFavorite
  const isFavorite = props.isFavorite
  

  const isMovieFavorite = isFavorite(movie.id)
  
  const image = movie.image?.medium || movie.image?.original || ''
  
  const genres = movie.genres?.join(', ') || 'Unknown genre'
  
  function handleFavoriteClick() {
    if (isMovieFavorite) {
      removeFavorite(movie.id)
    } else {
      addFavorite({ 
        id: movie.id, 
        name: movie.name, 
        image: movie.image 
      })
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      {image ? (
        <img src={image} alt={movie.name} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
          No image
        </div>
      )}

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-1">{movie.name}</h3>
        <p className="text-sm text-gray-600 flex-1">{genres}</p>

        <div className="mt-4 flex items-center justify-between">
          <Link to={`/movie/${movie.id}`} className="text-sm underline">
            Details
          </Link>

          <button
            onClick={handleFavoriteClick}
            className={`px-3 py-1 rounded-md text-sm border ${isMovieFavorite ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700'}`}
          >
            {isMovieFavorite ? 'Remove' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieCard