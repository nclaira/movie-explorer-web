const API_BASE = 'https://api.tvmaze.com'


export async function fetchShowsByQuery(q) {
if (!q) {

const res = await fetch(`${API_BASE}/shows?page=1`)
return res.json()
}
const res = await fetch(`${API_BASE}/search/shows?q=${encodeURIComponent(q)}`)
const data = await res.json()

return data.map((s) => s.show)
}


export async function fetchShowById(id) {
const res = await fetch(`${API_BASE}/shows/${id}`)
return res.json()
}