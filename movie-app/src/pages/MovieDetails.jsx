import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchShowById } from '../utils/api'
import { useFavoritesContext } from '../hooks/useFavorites.jsx'

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesContext()

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const data = await fetchShowById(id)
        if (!cancelled) setMovie(data)
      } catch (e) {
        if (!cancelled) setError('Failed to load show')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => (cancelled = true)
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (!movie) return <p>Not found</p>

  const img = movie.image?.original || movie.image?.medium

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
              onClick={() =>
                isFavorite(movie.id)
                  ? removeFavorite(movie.id)
                  : addFavorite({ id: movie.id, name: movie.name, image: movie.image })
              }
              className={`px-4 py-2 rounded ${
                isFavorite(movie.id) ? 'bg-emerald-600 text-white' : 'border'
              }`}
            >
              {isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
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
