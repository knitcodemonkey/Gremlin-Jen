import React from 'react'
import './tags.css'

const searchLink = `https://www.npmjs.com/search`

const Tags = tags => {
  return (
    <div className="tags">
      {tags.map(tag => (
        <a href={`${searchLink}?q=keyword:${tag}`}>
          ${tag}
        </a>
      ))}
    </div>
  )
}

export default Tags
