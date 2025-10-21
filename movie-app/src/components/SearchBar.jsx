import React from 'react'


export default function SearchBar({ value, onChange, placeholder = 'Search movies...' }) {
return (
<div className="w-full">
<input
value={value}
onChange={(e) => onChange(e.target.value)}
placeholder={placeholder}
className="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
/>
</div>
)
}