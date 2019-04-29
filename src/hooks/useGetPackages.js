import { useState, useEffect } from 'react'

/**
 *
 * @param {string} str The search string
 */
const useGetPackages = str => {
  const [results, setResults] = useState([])

  async function fetchPackages(string = str) {
    console.log(string)
    /** API for pulling 25 suggested packages */
    const API = `https://api.npms.io/v2/search/suggestions?q=${string}`

    const res = await fetch(API, {
      headers: {
        Accept: 'application/json'
      }
    })

    const data = await res.json()
    // https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
    data.sort((a, b) =>
      a.score.detail.popularity > b.score.detail.popularity
        ? -1
        : 1
    )
    setResults(data)
  }

  useEffect(() => {
    fetchPackages(str)
  }, [str])

  return [results, fetchPackages]
}

export default useGetPackages
