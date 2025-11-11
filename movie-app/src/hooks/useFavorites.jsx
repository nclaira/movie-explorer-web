import React, { createContext, useContext, useEffect, useState } from 'react'


const FavoritesContext = createContext()
const STORAGE_KEY = 'movie_app_favorites_v1'


export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setFavorites(JSON.parse(raw))
    } catch (error) {
   console.error('Error accessing localStorage:', error);
      // Silently handle localStorage errors
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      //
    }
  }, [favorites])

  function addFavorite(movie) {
    setFavorites((prev) => {
      if (prev.find((m) => m.id === movie.id)) return prev
      return [...prev, movie]
    })
  }

  function removeFavorite(id) {
    setFavorites((prev) => prev.filter((m) => m.id !== id))
  }

  function isFavorite(id) {
    return favorites.some((m) => m.id === id)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}


export function useFavoritesContext() {
  return useContext(FavoritesContext)
}