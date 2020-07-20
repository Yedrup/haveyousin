import React, { Component, cloneElement } from 'react';
import MediaQuery from 'react-responsive';
import Truncate from 'react-truncate';
import { Link } from 'react-router-dom';
import ImageService from '../../services/ImageService';
import './card.css';
import { withRouter } from 'react-router-dom';

class Card extends Component {
  render() {
    const {
      ActionPanel,
      hysId,
      contentType,
      contentId,
      poster,
      release,
      title,
    } = this.props;

    let stateToPass = {
      hysId,
      contentType,
      contentId,
      poster,
      release,
      title,
    };

    if (contentType !== 'person') {
      let overview = this.props.overview;
      return (
        <article className="c-card">
          <MediaQuery maxWidth={767}>
            <Link
              className=""
              to={{
                pathname: `/details/${contentId}/${contentType}`,
                state: { ...stateToPass },
              }}
            >
              <ImageService size="92" photoPath={poster} imageTitle={title} />
            </Link>
            <div className="c-card__body--small">
              <header className="c-card__header">
                <Link
                  to={{
                    pathname: `/details/${contentId}/${contentType}`,
                    state: { ...stateToPass },
                  }}
                >
                  <h2 className="c-card__title">
                    <Truncate
                      lines={1}
                      ellipsis={'...'}
                      trimWhitespace
                      width={210}
                    >
                      {title}
                    </Truncate>
                  </h2>
                </Link>
                <span className="c-card__secondary-info c-card__date">
                  {release}
                </span>
              </header>
              <p className="c-card__secondary-info c-card__secondary-info-text">
                <Truncate lines={2} ellipsis={'...'} trimWhitespace width={0}>
                  {overview}
                </Truncate>
              </p>
              <footer>
                {cloneElement(ActionPanel, {
                  ...stateToPass,
                })}
              </footer>
            </div>
          </MediaQuery>

          <MediaQuery minWidth={767}>
            <Link
              className=""
              to={{
                pathname: `/details/${contentId}/${contentType}`,
                state: { ...stateToPass },
              }}
            >
              <header className="c-card__header">
                <h2 className="c-card__title">
                  <Truncate lines={1} ellipsis={'...'} width={210}>
                    {title}
                  </Truncate>
                </h2>
                <span className="c-card__secondary-info c-card__date">
                  {release}
                </span>
              </header>
              <ImageService size="185" photoPath={poster} imageTitle={title} />
            </Link>
            <footer>
              {cloneElement(ActionPanel, {
                ...stateToPass,
              })}
            </footer>
          </MediaQuery>
        </article>
      );
    } else {
      return (
        <figure>
          <Link
            className=""
            to={{
              pathname: `/details/${contentId}/${contentType}`,
              state: {
                ...stateToPass,
              },
            }}
          >
            <ImageService size="185" photoPath={poster} imageTitle={title} />
          </Link>
          <figcaption>{title}</figcaption>
          {cloneElement(ActionPanel, {
            ...stateToPass,
          })}
        </figure>
      );
    }
  }
}

export default withRouter(Card);
