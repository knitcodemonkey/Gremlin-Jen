import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import Result from './components/Result/Result'
import Pagination from './components/Pagination/Pagination'
import { useGetPackages, useSortPackages } from './hooks'

// styles
import './index.css'

const App = () => {
  const inputVal = useRef('')
  const [packages, fetchPackages] = useGetPackages(
    new URLSearchParams(document.location.search).get('q')
  )
  const [sortType, setSortType] = useState(
    new URLSearchParams(document.location.search).get(
      'ranking'
    )
  )
  const [sortedPackages, sortPackages] = useSortPackages()

  useEffect(() => {
    sortPackages(packages, sortType)
  }, [packages, sortType, sortPackages])

  const updateURL = () => {
    window.location.href = `/search?q=${
      inputVal.current.value
    }${sortType ? `&ranking=${sortType}` : ''}`
  }

  const sortStats = [
    'optimal',
    'popularity',
    'quality',
    'maintenance'
  ]

  return (
    <div className="App" css={{ color: 'darkgray' }}>
      <header>
        <nav>
          <div>
            <span
              role="img"
              aria-label="heart"
              className="emoji-heart"
            >
              ❤
            </span>{' '}
            <span className="poppins">
              Null Pointer Micromanagement
            </span>
          </div>
          <div>Actual nav</div>
        </nav>
        <form
          onSubmit={e => {
            e.preventDefault()
            fetchPackages(inputVal.current.value)
          }}
        >
          <svg className="icon npm" alt="NPM logo">
            <use xlinkHref="#npm" />
          </svg>
          <label htmlFor="search">
            <svg className="search" alt="search">
              <use xlinkHref="#magnify" />
            </svg>
          </label>
          <input
            id="search"
            type="text"
            ref={inputVal}
            defaultValue={new URLSearchParams(
              document.location.search
            ).get('q')}
            placeholder="Search NPM"
          />

          <input type="submit" value="Submit" />
        </form>
      </header>
      <main>
        <div className="breadcrumbs">
          <div>{packages.length} packages found</div>
          <Pagination />
        </div>

        <div className="wrapper">
          <aside>
            <div className="sidebar">
              <p>Sort Packages</p>
              {sortStats.map(stat => (
                <button
                  onClick={() => {
                    setSortType(stat)
                    updateURL()
                  }}
                  className={stat}
                  key={`sortStats_${stat}`}
                >
                  {stat}
                </button>
              ))}
            </div>
          </aside>

          <section className="content">
            {packages.length > 0 ? (
              sortedPackages.map((result, idx) => {
                const key =
                  result.package.name ||
                  `${result.package.links.npm}_${idx}`
                return (
                  <Result
                    data={result.package}
                    score={result.score}
                    key={key}
                    onClick={val => {
                      inputVal.current.value = val
                      updateURL()
                      fetchPackages(val)
                    }}
                  />
                )
              })
            ) : (
              <article>No results found</article>
            )}
            <div className="block">
              <a href="https://npms.io">
                powered by npms.io{' '}
                <span role="img" aria-label="rocket">
                  🚀
                </span>
              </a>
            </div>
          </section>
        </div>
      </main>
      <footer className="flex">
        <div className="logo" />
        <nav className="flex">
          <div className="col1" />
          <div className="col1" />
          <div className="col1" />
        </nav>
      </footer>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
