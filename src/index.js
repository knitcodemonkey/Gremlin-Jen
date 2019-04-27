import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import Result from './components/Result'

import './styles.css'

function useGetPackages(str) {
  const [results, setResults] = useState([])

  async function fetchPackages(string = str) {
    const API = `https://api.npms.io/v2/search/suggestions?q=${string}`
    console.log(API)
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
  const inputVal = useRef(null)
  const [packages, fetchPackages] = useGetPackages()

  return (
    <div className="App" css={{ color: 'darkgray' }}>
      <header>
        <nav>
          <div>Some silly Saying</div>
          <div>Actual nav</div>
        </nav>
        <form
          onSubmit={e => {
            e.preventDefault()
            console.log(inputVal.current)
            fetchPackages(inputVal.current.value)
          }}
        >
          <input
            type="text"
            ref={inputVal}
            placeholder="Search NPM"
          />
          <input type="submit" value="Submit" />
        </form>

        <div className="breadcrumbs">
          <div># Packages Found</div>
          <div>Pagination</div>
        </div>
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
          {packages.length > 0 ? (
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
