import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import Result from './components/Result/Result'
import { useGetPackages, useSortPackages } from './hooks'

// styles
import './css/variables.css'
import './css/styles.css'
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
    updateURL()
  }, [packages, sortType])

  const updateURL = () => {
    window.history.pushState(
      {},
      null,
      `/search?q=${
        inputVal.current.value
      }&ranking=${sortType}`
    )
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
          <div className="wrapper">
            <div className="flex">
              <span
                role="img"
                aria-label="heart"
                className="emoji-heart"
              >
                ❤
              </span>{' '}
              <span className="poppins">
                Gremlin is awesome
              </span>
            </div>
            <div>Navigation</div>
          </div>
        </nav>

        <form
          onSubmit={e => {
            e.preventDefault()
            fetchPackages(inputVal.current.value)
          }}
        >
          <div className="wrapper">
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
          </div>
        </form>
      </header>
      <main>
        <div className="breadcrumbs">
          <div className="wrapper">
            <div>{packages.length} packages found</div>
          </div>
        </div>

        <div className="mainWrapper">
          <aside>
            <div className="sidebar">
              <p>Sort Packages</p>
              {sortStats.map(stat => (
                <button
                  onClick={() => {
                    setSortType(stat)
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
                      fetchPackages(val)
                      updateURL()
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
