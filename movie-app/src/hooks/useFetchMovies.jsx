import { useEffect, useState } from 'react'
import { fetchShowsByQuery } from '../utils/api'


export default function useFetchMovies(query, pageSize = 20) {
const [movies, setMovies] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)


useEffect(() => {
let cancelled = false
async function load() {
setLoading(true)
setError(null)
try {
const data = await fetchShowsByQuery(query)
if (!cancelled) setMovies(data.slice(0, pageSize))
} catch (err) {
if (!cancelled) setError(err.message || 'Failed to load')
} finally {
if (!cancelled) setLoading(false)
}
}
load()
return () => (cancelled = true)
}, [query, pageSize])


return { movies, loading, error }
}