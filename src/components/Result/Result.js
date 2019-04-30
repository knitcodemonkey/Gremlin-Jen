/* @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'
import distanceInWords from 'date-fns/distance_in_words'

import '../../css/variables.css'
import '../../css/tooltip.css'
import './result.css'

/**
 * Displays each package result
 *
 * @param {object} data all the package data
 * @param {object} score the ratings for each package
 */
const Result = ({ data, score, onClick }) => {
  const oldness = new Date(data.date)
  const keywords = data.keywords
  const barStats = ['popularity', 'quality', 'maintenance']

  const author = data.author
    ? data.author
    : data.maintainers[0]

  return (
    <article>
      <section
        css={css`
          flex-grow: 1;
          margin-right: 20px;
        `}
      >
        <a href={data.links.npm}>
          <h3>{data.name}</h3>
        </a>
        <div className="description">
          {data.description}
        </div>

        {keywords
          ? keywords.map(word => (
              <button
                type="button"
                onClick={() => onClick(word)}
                key={`${data.name}_keyword_${word}`}
                className="keyword"
              >
                {word}
              </button>
            ))
          : ''}

        {author ? (
          <div className="stats">
            <img
              src={`https://avatars.githubusercontent.com/${
                author.username
              }`}
              alt={author.name || author.username}
            />
            <div className="author-name">
              {author.name || author.username}
            </div>
            <div className="published">
              Published {data.version}
            </div>
            <div className="published"> • </div>
            <div className="published">
              {distanceInWords(oldness, new Date())}
            </div>
          </div>
        ) : (
          ''
        )}
      </section>

      <section
        css={css`
          flex-grow: 0;
          margin-left: 20px;
          margin-top: 20px;
        `}
      >
        {barStats.map(stat => {
          return (
            <div
              className="stats bar"
              key={`barStats_${stat}`}
            >
              {stat.substring(0, 1)}
              <div
                className={`bar tooltip ${stat}`}
                style={{
                  width: `${score.detail[stat] * 100}px`
                }}
              >
                <span className="tooltiptext">
                  {(score.detail[stat] * 100).toFixed(3)}
                </span>
              </div>
            </div>
          )
        })}
      </section>
    </article>
  )
}

export default Result
