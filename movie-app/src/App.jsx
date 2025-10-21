import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'
import Navbar from './components/Navbar'
import { FavoritesProvider } from './hooks/useFavorites.jsx'


export default function App() {
return (
<FavoritesProvider>
<div className="min-h-screen bg-gray-50 text-gray-900">
<Navbar />
<main className="container mx-auto px-4 py-6">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/movie/:id" element={<MovieDetails />} />
<Route path="/favorites" element={<Favorites />} />
</Routes>
</main>
</div>
</FavoritesProvider>
)
}