/* @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'

import distanceInWords from 'date-fns/distance_in_words'

import '../styles.css'

const Package = ({ data, score }) => {
  const oldness = new Date(data.date)
  console.log(oldness, distanceInWords(oldness, new Date()))
  return data ? (
    <article
      css={css`
        padding: 20px 0;
        border-bottom: 1px solid grey;
        display: flex;
        flex-direction: row;
        justify-content: start;
        line-height: 2em;
      `}
    >
      <section
        css={css`
          flex-grow: 1;
          margin-right: 20px;
        `}
      >
        <div
          css={css`
            font-weight: bold;
          `}
        >
          {data.name}
        </div>
        <div className="description">
          {data.description}
        </div>
        <div className="tagsList">List of tags</div>
        {data.author ? (
          <div
            css={css`
              display: flex;
              justify-content: start;
              align-items: center;
              div {
                margin-left: 10px;
              }
            `}
          >
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
        `}
      >
        <div>
          p(opularity){' '}
          <div
            style={{
              width: `${score.detail.popularity * 50}px`,
              color: 'teal'
            }}
          />
        </div>
        <div>
          q(uality){' '}
          <div
            style={{
              width: `${score.detail.quality * 50}px`,
              color: 'purple'
            }}
          />
        </div>
        <div>
          m(aintenance){' '}
          <div
            style={{
              width: `${score.detail.maintenance * 50}px`,
              color: 'red'
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
