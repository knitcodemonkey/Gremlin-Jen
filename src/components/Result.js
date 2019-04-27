/* @jsx jsx */
import React from 'react'
import { formatDistance, parse } from 'date-fns'

import '../styles.css'

const Package = ({ data, score }) => {
  return data.package ? (
    <article className="package">
      <section className="info">
        <div className="name">{data.package.name}</div>
        <div className="description">
          {data.package.description}
        </div>
        <div className="tagsList">List of tags</div>
        {data.author ? (
          <div className="author">
            <img
              className="photo"
              src={`https://avatars.githubusercontent.com/${
                data.package.author.username
              }.png`}
              alt={data.package.author.name}
            />
            <name>{data.package.author.name}</name>
          </div>
        ) : (
          ''
        )}
        <version>Published {data.package.version}</version>
        <div> • </div>
        <when>
          {formatDistance(
            parse(data.package.date),
            new Date()
          )}
        </when>
      </section>

      <section className="rank">
        <div>
          p(opularity){' '}
          <div
            style={{
              width: `${data.score.detail.popularity *
                50}px`,
              color: 'teal'
            }}
          />
        </div>
        <div>
          q(uality){' '}
          <div
            style={{
              width: `${data.score.detail.quality * 50}px`,
              color: 'purple'
            }}
          />
        </div>
        <div>
          m(aintenance){' '}
          <div
            style={{
              width: `${data.score.detail.maintenance *
                50}px`,
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
