import { useState, useEffect } from 'react'

/**
 *
 * @param {string} str The search string
 */
const useGetPackages = str => {
  const [results, setResults] = useState([])

  async function fetchPackages(string = str) {
    /** API for pulling 25 suggested packages */
    const API = `https://api.npms.io/v2/search/suggestions?q=${string}`

    const res = await fetch(API, {
      headers: {
        Accept: 'application/json'
      }
    })

    // Sort data by popularity by default
    const data = await res.json()
    // https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
    setResults(data)
  }

  useEffect(() => {
    fetchPackages(str)
  }, [str])

  return [results, fetchPackages]
}

export default useGetPackages
