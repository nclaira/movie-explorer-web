import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchShowById } from '../utils/api'

function MovieDetails(props) {
  const addFavorite = props.addFavorite
  const removeFavorite = props.removeFavorite
  const isFavorite = props.isFavorite
  
  const params = useParams()
  const id = params.id
  
  const [movie, setMovie] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  
  const [error, setError] = React.useState(null)

  React.useEffect(function() {
    let cancelled = false
    
    function loadMovie() {
      setLoading(true)
      
      fetchShowById(id)
        .then(function(data) {

















          if (!cancelled) {
            setMovie(data)
          }
        })
        .catch(function(e) {
          if (!cancelled) {
            setError('Failed to load show')
          }
        })
        .finally(function() {
          if (!cancelled) {
            setLoading(false)
          }
        })
    }
    
    loadMovie()
    
    return function() {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return <p>Loading...</p>
  }
  
  if (error) {
    return <p className="text-red-500">{error}</p>
  }
  
  if (!movie) {
    return <p>Not found</p>
  }

  const img = movie.image?.original || movie.image?.medium
  
  const isMovieFavorite = isFavorite(movie.id)
  
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
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {img && <img src={img} alt={movie.name} className="w-full md:w-1/3 rounded" />}

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{movie.name}</h1>
          <p className="text-sm text-gray-600 mb-4">{movie.genres?.join(', ')}</p>

          <div
            className="prose prose-sm max-w-none mb-4"
            dangerouslySetInnerHTML={{ __html: movie.summary || '' }}
          />

          <div className="flex items-center gap-3">
            <button
              onClick={handleFavoriteClick}
              className={`px-4 py-2 rounded ${isMovieFavorite ? 'bg-emerald-600 text-white' : 'border'}`}
            >
              {isMovieFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>

            <Link to="/" className="underline">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
