const API_BASE = 'https://api.tvmaze.com'

function fetchShowsByQuery(query) {
  if (!query) {
    return fetch(`${API_BASE}/shows?page=1`)
      .then(function(response) {
        return response.json()
      })
  }
  
  const searchUrl = `${API_BASE}/search/shows?q=${encodeURIComponent(query)}`
  
  return fetch(searchUrl)
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      return data.map(function(item) {
        return item.show
      })
    })
}

function fetchShowById(id) {
  return fetch(`${API_BASE}/shows/${id}`)
    .then(function(response) {
      return response.json()
    })
}

export { fetchShowsByQuery, fetchShowById }