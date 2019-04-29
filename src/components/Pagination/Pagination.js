import React from 'react'
import './pagination.css'

const searchLink = `https://www.npmjs.com/search`

const Pagination = ({ perPage, numResults, keyword }) => {
  const pages = Math.ceil(numResults / perPage)

  let pagination = []

  for (let i = 0; i < pages; i++) {
    let link = `${searchLink}?q=${keyword}&page=${i}&perPage=${perPage}`

    if (pages > 1) {
      pagination.push(`<a href=${link}>${i + 1}</a>`)
    }
  }

  return (
    <div className="pagination">
      {pagination.map(page => page)}
    </div>
  )
}

export default Pagination
