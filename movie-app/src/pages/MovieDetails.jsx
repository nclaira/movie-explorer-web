// function About() {
//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>

      
//       <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mb-12">
//         <h2 className="text-2xl font-semibold mb-4 text-green-700">Who We Are</h2>
//         <p className="text-gray-700 leading-relaxed mb-4">
//           At <strong>BrightBuy Shop</strong>, we’re passionate about bringing you the best in
//           quality products and creative designs. We are an innovative company dedicated to offering
//           top-notch fashion, electronics, and lifestyle accessories that meet modern standards of
//           style and comfort.
//         </p>
//         <p className="text-gray-700 leading-relaxed mb-4">
//           Our mission is to make shopping simple, enjoyable, and accessible for everyone — combining
//           functionality, creativity, and affordability. Whether you're looking for the latest
//           gadgets or stylish everyday wear, we’ve got you covered.
//         </p>
//       </div>

      

//       <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8">
//         <h2 className="text-2xl font-semibold mb-6 text-green-700 text-center">Why Choose Us</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
//             <h3 className="text-xl font-semibold mb-2">✅ Quality Products</h3>
//             <p className="text-gray-700">
//               We source only the best materials and work with trusted suppliers to ensure premium
//               quality in everything we offer.
//             </p>
//           </div>

//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
//             <h3 className="text-xl font-semibold mb-2">⚡ Fast & Reliable Service</h3>
//             <p className="text-gray-700">
//               From browsing to delivery, we ensure a smooth, fast, and satisfying shopping
//               experience for all our customers.
//             </p>
//           </div>

//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
//             <h3 className="text-xl font-semibold mb-2">💬 Excellent Support</h3>
//             <p className="text-gray-700">
//               Our support team is always ready to help you with any questions or issues you might
//               have  your satisfaction is our priority.
//             </p>
//           </div>

//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
//             <h3 className="text-xl font-semibold mb-2">🌱 Affordable & Sustainable</h3>
//             <p className="text-gray-700">
//               We believe quality shouldn’t break the bank. Our products are priced fairly and made
//               with sustainability in mind.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default About;




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
