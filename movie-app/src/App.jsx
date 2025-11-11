import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'
import Navbar from './components/navbar';

const STORAGE_KEY = 'movie_app_favorites_v1'

function App() {
  const [favorites, setFavorites] = React.useState([])
  React.useEffect(function() {
    try {
      const savedFavorites = localStorage.getItem(STORAGE_KEY)
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
      }
    } catch (error) {
      console.log('Error loading favorites:', error)
    }
  }, [])

  React.useEffect(function() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch (error) {
      console.log('Error saving favorites:', error)
    }
  }, [favorites])

  function addFavorite(movie) {
    setFavorites(function(previousFavorites) {
      const alreadyExists = previousFavorites.find(function(m) {
        return m.id === movie.id
      })
      
      if (alreadyExists) {
        return previousFavorites
      }
      
      return [...previousFavorites, movie]
    })
  }
  function removeFavorite(id) {
    setFavorites(function(previousFavorites) {
      return previousFavorites.filter(function(m) {
        return m.id !== id
      })
    })
  }
  function isFavorite(id) {
    return favorites.some(function(m) {
      return m.id === id
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar favorites={favorites} />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                favorites={favorites}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
                isFavorite={isFavorite}
              />
            } 
          />
          <Route 
            path="/movie/:id" 
            element={
              <MovieDetails 
                favorites={favorites}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
                isFavorite={isFavorite}
              />
            } 
          />
          <Route 
            path="/favorites" 
            element={
              <Favorites 
                favorites={favorites}
                removeFavorite={removeFavorite}
              />
            } 
          />
        </Routes>
      </main>
    </div>
  )
}

export default App