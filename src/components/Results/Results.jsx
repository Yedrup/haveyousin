import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './results.css';
import ImageService from '../../services/ImageService';
import { withRouter } from 'react-router-dom';
import {
  createHysIdForItems,
  defineContentType,
} from '../../services/listServiceHelper';

class Results extends Component {
  render() {
    const {
      currentResults,
      isSearchFieldOpenSmallDevice,
      clearResults,
    } = this.props;

    let searchResults = currentResults || null;
    if (isSearchFieldOpenSmallDevice === false) return null;
    if (searchResults.length > 0) {
      return (
        <div className="c-searchResults">
          {searchResults.map(
            ({
              id,
              media_type,
              profile_path,
              backdrop_path,
              first_air_date,
              release_date,
              title,
              poster_path,
              name,
            }) => {
              let hysId = createHysIdForItems(id, media_type);

              return (
                <Link
                  className="c-result"
                  key={id}
                  id={id}
                  to={{
                    pathname: `/details/${id}/${media_type}`,
                    state: {
                      contentId: id,
                      contentType: media_type,
                      hysId,
                      poster:
                        media_type === 'person' ? profile_path : backdrop_path,
                      release:
                        media_type === 'tv' ? first_air_date : release_date,
                      title,
                    },
                  }}
                  onClick={clearResults}
                >
                  <div className="c-result__inner">
                    <ImageService
                      size="45"
                      photoPath={
                        media_type === 'person' ? profile_path : poster_path
                      }
                      imageTitle={media_type === 'movie' ? title : name}
                    />
                    <p className="c-result__title">
                      {media_type === 'movie' ? title : name}
                    </p>
                  </div>
                </Link>
              );
            }
          )}
        </div>
      );
    } else {
      return null;
    }
  }
}
export default withRouter(Results);
