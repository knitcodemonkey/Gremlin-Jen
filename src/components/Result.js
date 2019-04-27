/* @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import distanceInWordsToNow from 'date-fns/distance_in_words'
import parse from 'date-fns/parse'

import '../styles.css'

const Package = ({ data, score }) => {
  return data ? (
    <article className="package">
      <section className="info">
        <div className="name">{data.name}</div>
        <div className="description">
          {data.description}
        </div>
        <div className="tagsList">List of tags</div>
        {data.author ? (
          <div className="author">
            <img
              className="photo"
              src={`https://avatars.githubusercontent.com/${
                data.author.username
              }.png`}
              alt={data.author.name}
            />
            <div className="name">{data.author.name}</div>
          </div>
        ) : (
          ''
        )}
        <version>Published {data.version}</version>
        <div> • </div>
        <div>
          {distanceInWordsToNow(new Date(parse(data.date)))}
        </div>
      </section>

      <section className="rank">
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
