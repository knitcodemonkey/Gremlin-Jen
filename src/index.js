import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import Result from './components/Result/Result'
import Pagination from './components/Pagination/Pagination'
import getUrlVars from './helpers/getUrlVars'
import { useGetPackages, useSortPackages } from './hooks'

// styles
import './index.css'

const App = () => {
  const inputVal = useRef('')
  const [packages, fetchPackages] = useGetPackages(
    getUrlVars().q
  )
  const [sortType, setSortType] = useState([
    getUrlVars().ranking || ''
  ])
  const [sortedPackages, sortPackages] = useSortPackages()

  useEffect(() => {
    sortPackages(packages, sortType)
  }, [packages, sortType])

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
            console.log(inputVal.current)
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
            defaultValue={getUrlVars().q}
            placeholder="Search NPM"
          />

          <input type="submit" value="Submit" />
        </form>
      </header>
      <main>
        <div className="breadcrumbs">
          <div>3{packages.length} packages found</div>
          <Pagination />
        </div>

        <div className="wrapper">
          <aside>
            <div className="sidebar">
              <p>Sort Packages</p>
              {sortStats.map(stat => (
                <button
                  onClick={() => setSortType(stat)}
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
                    highlight={result.highlight}
                    data={result.package}
                    score={result.score}
                    key={key}
                    onClick={val => {
                      inputVal.current.value = val
                      window.location.href = `/search?q=${val}${
                        sortType
                          ? `&ranking=${sortType}`
                          : ''
                      }`
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
