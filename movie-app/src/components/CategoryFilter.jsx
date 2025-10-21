import React from 'react'


export default function CategoryFilter({ categories = [], value, onChange }) {
return (
<select
value={value}
onChange={(e) => onChange(e.target.value)}
className="rounded-md border px-3 py-2"
>
<option value="">All Genres</option>
{categories.map((c) => (
<option key={c} value={c}>{c}</option>
))}
</select>
)
}