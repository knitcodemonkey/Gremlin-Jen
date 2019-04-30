import { useState } from 'react'

/**
 * Sorts an array of package objects
 *
 * @param  {array} packages array of package objects
 * @param  {string || undefined} sortType
 * @return
 */
const useSortPackages = packages => {
  const [results, setResults] = useState(packages)

  function sortPackages(pkgs, sortType) {
    const res = pkgs.sort((a, b) => {
      // There are three parameters that can be used as the score.
      switch (sortType) {
        case 'optimal': // takes an average of [popularity, maintenance and quality]
          return a.score.detail.final < b.score.detail.final
            ? 1
            : -1
        case 'popularity':
        case 'maintenance':
        case 'quality':
          return a.score.detail[sortType] <
            b.score.detail[sortType]
            ? 1
            : -1
        default:
          return a.searchScore < b.searchScore ? -1 : 1
      }
    })

    setResults(res)
  }

  return [results, sortPackages]
}

export default useSortPackages
