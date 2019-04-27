import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Result from './components/Result'

import './styles.css'

function getPackages(str) {
  const [results, setResults] = useState([])

  async function fetchPackages(str) {
    const API = `https://api.npms.io/v2/search/suggestions?q=${str}`
    const res = await fetch(API, {
      headers: {
        Accept: 'application/json'
      }
    })

    const data = await res.json()
    setResults(data)
  }

  useEffect(() => {
    fetchPackages(str)
  }, [str])

  return [results, fetchPackages]
}

const App = () => {
  const [search, setSearch] = useState('')
  const [packages, fetchPackages] = getPackages(search)

  return (
    <div className="App" css={{ color: 'darkgray' }}>
      <header>
        <form
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            fetchPackages(search)
          }}
        >
          <input
            type="text"
            placeholder="Search NPM"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>

        <nav>
          <div># Packages Found</div>
          <div>Pagination</div>
        </nav>
      </header>
      <main>
        <aside>
          <div className="sidebar">
            <div>Sort Packages</div>
            <div className="optimal">Optimal</div>
            <div className="popularity">Popularity</div>
            <div className="quality">Quality</div>
            <div className="maintenance">Maintenance</div>
          </div>
        </aside>
        <section className="content">
          <p>Search Results</p>
          {packages.length ? (
            packages.map((result, idx) => {
              const key =
                result.package.name ||
                `${result.package.links.npm}_${idx}`
              return (
                <Result
                  data={result.package}
                  score={result.score}
                  key={key}
                />
              )
            })
          ) : (
            <article>No results found</article>
          )}
        </section>
      </main>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
