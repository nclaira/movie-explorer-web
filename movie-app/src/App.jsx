// import './App.css'
// import './index.css'
// import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'  
// import Home from './components/home'
// import Navbar from './components/navbar'
// import About from './pages/about'
// import Products from './pages/products'
// import Contact from './pages/contact'
// import Footer from './components/footer'

// function App() {
  
//   return (
//     <nav>

//     <Router>
//       <Navbar/> 
        
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/contact" element={<Contact />} /> 
//       </Routes>

//       <Footer/>
//     </Router>
      
//     </nav>
//   )
// }

// export default App




import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/home'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'
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