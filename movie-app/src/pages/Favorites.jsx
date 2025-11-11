import React from 'react'
import { Link } from 'react-router-dom'

function Favorites(props) {
  const favorites = props.favorites
  const removeFavorite = props.removeFavorite
  
  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
        <p className="text-gray-600 mb-6">You have 0 favorite movies</p>
        <Link to="/" className="text-emerald-600 underline">
          Browse movies
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Favorites ({favorites.length})</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map(function(movie) {
          const image = movie.image?.medium || movie.image?.original || ''
          
          function handleRemoveClick() {
            removeFavorite(movie.id)
          }
          
          return (
            <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              {image ? (
                <img src={image} alt={movie.name} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-2">{movie.name}</h3>

                <div className="mt-auto flex items-center justify-between">
                  <Link to={`/movie/${movie.id}`} className="text-sm underline text-emerald-600">
                    View Details
                  </Link>

                  <button
                    onClick={handleRemoveClick}
                    className="px-3 py-1 rounded-md text-sm bg-red-500 text-white hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Favorites
