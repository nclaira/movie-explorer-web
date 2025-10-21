import React, { useMemo, useState } from 'react'
import useFetchMovies from '../hooks/useFetchMovies.jsx'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import MovieCard from '../components/MovieCard'


export default function Home() {
const [query, setQuery] = useState('')
const { movies, loading, error } = useFetchMovies(query, 40)
const [genre, setGenre] = useState('')


// derive unique genres
const genres = useMemo(() => {
const set = new Set()
movies.forEach(m => (m.genres || []).forEach(g => set.add(g)))
return Array.from(set)
}, [movies])


const filtered = movies.filter(m => {
const matchesQuery = query.trim() === '' ? true : m.name.toLowerCase().includes(query.toLowerCase())
const matchesGenre = genre === '' ? true : (m.genres || []).includes(genre)
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


{!loading && filtered.length === 0 && (
<p className="text-center text-gray-600">No movies found</p>
)}


<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
{filtered.map(movie => (
<MovieCard key={movie.id} movie={movie} />
))}
</div>
</div>
)
}