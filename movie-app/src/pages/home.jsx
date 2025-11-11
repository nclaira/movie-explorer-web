import React from 'react'
import { fetchShowsByQuery } from '../utils/api'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import MovieCard from '../components/MovieCard'

function Home(props) {

  const addFavorite = props.addFavorite
  const removeFavorite = props.removeFavorite
  const isFavorite = props.isFavorite
  
  const [query, setQuery] = React.useState('')
  
  const [genre, setGenre] = React.useState('')

  const [movies, setMovies] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  
  React.useEffect(function() {
    let cancelled = false
    
    function loadMovies() {
      setLoading(true)
      setError(null)
      
      fetchShowsByQuery(query)
        .then(function(data) {
          if (!cancelled) {
      
            setMovies(data.slice(0, 40))
          }
        })
        .catch(function(err) {
          if (!cancelled) {
            setError(err.message || 'Failed to load movies')
          }
        })
        .finally(function() {
          if (!cancelled) {
            setLoading(false)
          }
        })
    }
    
    loadMovies()
    
    return function() {
      cancelled = true
    }
  }, [query])
  
  
  const genres = React.useMemo(function() {
    const genreSet = new Set()
    
    movies.forEach(function(movie) {
      const movieGenres = movie.genres || []
      movieGenres.forEach(function(g) {
        genreSet.add(g)
      })
    })
    
    return Array.from(genreSet)
  }, [movies])
  
  const filteredMovies = movies.filter(function(movie) {
    const matchesQuery = query.trim() === '' ? true : movie.name.toLowerCase().includes(query.toLowerCase())
    
    const movieGenres = movie.genres || []
    const matchesGenre = genre === '' ? true : movieGenres.includes(genre)
    
    return matchesQuery && matchesGenre
  })
  
  return (
    <div>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="md:col-span-2">
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <div className="flex justify-end">
          <CategoryFilter categories={genres} value={genre} onChange={setGenre} />
        </div>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && filteredMovies.length === 0 && (
        <p className="text-center text-gray-600">No movies found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map(function(movie) {
          return (
            <MovieCard 
              key={movie.id} 
              movie={movie}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
              isFavorite={isFavorite}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Home