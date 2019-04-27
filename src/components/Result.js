/* @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'

import distanceInWords from 'date-fns/distance_in_words'

import './result.css'

const Package = ({ data, score }) => {
  const oldness = new Date(data.date)
  console.log(oldness, distanceInWords(oldness, new Date()))
  return data ? (
    <article>
      <section
        css={css`
          flex-grow: 1;
          margin-right: 20px;
        `}
      >
        <div className="bold">{data.name}</div>
        <div className="description">
          {data.description}
        </div>
        <div className="tagsList">List of tags</div>
        {data.author ? (
          <div className="stats">
            <img
              css={css`
                width: 16px;
                height: 16px;
              `}
              src={`https://avatars.githubusercontent.com/${
                data.author.username
              }`}
              alt={data.author.name}
            />
            <div className="name">{data.author.name}</div>
            <div>Published {data.version}</div>
            <div> • </div>
            <div>
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
        <div className="stats bar">
          p
          <div
            className="bar popularity"
            css={css`
              width: ${score.detail.popularity * 50}px;
            `}
          />
        </div>
        <div className="stats bar">
          q
          <div
            className="bar quality"
            style={{
              width: `${score.detail.quality * 100}px`
            }}
          />
        </div>
        <div className="stats bar">
          m
          <div
            className="maintenance"
            style={{
              width: `${score.detail.maintenance * 50}px`
            }}
          />
        </div>
      </section>
    </article>
  ) : (
    ''
  )
}

export default Package
