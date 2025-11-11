import React from 'react'

function SearchBar(props) {
  const value = props.value
  const onChange = props.onChange
  const placeholder = props.placeholder || 'Search movies...'
  
  function handleChange(event) {
    onChange(event.target.value)
  }
  
  return (
    <div className="w-full">
      <input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />
    </div>
  )
}

export default SearchBar