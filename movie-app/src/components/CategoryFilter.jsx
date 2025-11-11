import React from 'react'


function CategoryFilter(props) {
  const categories = props.categories || []
  const value = props.value
  const onChange = props.onChange
  
  function handleChange(event) {
    onChange(event.target.value)
  }
  
  return (
    <select
      value={value}
      onChange={handleChange}
      className="rounded-md border px-3 py-2"
    >
      
      <option value="">All Genres</option>
      {categories.map(function(category) {
        return (
          <option key={category} value={category}>
            {category}
          </option>
        )
      })}
    </select>
  )
}

export default CategoryFilter