import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react'
import ReactDOM from 'react-dom'
import Result from './components/Result/Result'
import { useGetPackages, useSortPackages } from './hooks'

// styles
import './css/variables.css'
import './css/styles.css'
import './index.css'

const App = () => {
  // The value of the input field
  const inputVal = useRef('')

  // Use custom useGetPackages to get the list of packages
  // The default parameter is pulled from the URL
  const [packages, fetchPackages] = useGetPackages(
    new URLSearchParams(document.location.search).get('q')
  )

  // Set the sort type of the list [optimal, popularity, quality, maintenance]
  const [sortType, setSortType] = useState(
    new URLSearchParams(document.location.search).get(
      'ranking'
    ) || 'optimal'
  )

  // the sorted list of packages
  const [sortedPackages, sortPackages] = useSortPackages(
    packages,
    sortType
  )

  // Make the URL match the parameters for easy copy/paste
  const updateURL = useCallback(() => {
    window.history.pushState(
      {},
      null,
      `/search?q=${
        inputVal.current.value
      }&ranking=${sortType}`
    )
  }, [inputVal, sortType])

  useEffect(() => {
    if (packages.length > 0) {
      sortPackages(packages, sortType)
      updateURL()
    }
  }, [packages, sortType, setSortType])

  // List of possible sort types
  const sortTypeOptions = [
    'optimal',
    'popularity',
    'quality',
    'maintenance'
  ]

  return (
    <div className="App" css={{ color: 'darkgray' }}>
      <header>
        {/* Nav above search bar */}
        <nav>
          <div className="wrapper">
            <div className="flex">
              <span
                role="img"
                aria-label="heart"
                className="emoji-heart"
              >
                ❤
              </span>
              <span className="poppins">
                Gremlin is awesome
              </span>
            </div>
            <div>Navigation</div>
          </div>
        </nav>

        {/* search bar */}
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

      {/* Content below header */}
      <main>
        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <div className="wrapper">
            <div>{packages.length || 0} packages found</div>
          </div>
        </div>

        <div className="mainWrapper">
          {/* sidebar */}
          <aside>
            <div className="sidebar">
              <p>Sort Packages</p>
              {sortTypeOptions.map(stat => (
                <button
                  onClick={() => {
                    setSortType(stat)
                  }}
                  className={stat}
                  key={`sortTypeOptions_${stat}`}
                >
                  {stat}
                </button>
              ))}
            </div>
          </aside>

          {/* list of packages */}
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
          </section>
        </div>
      </main>

      {/* footer */}
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
