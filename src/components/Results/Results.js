import React from "react";
import { Link } from "react-router-dom";
import "./results.css";
import ImageService from "../../services/ImageService";
import { withRouter } from "react-router-dom";
import {createHysIdForItems, defineContentType} from "../../services/listServiceHelper";

class Results extends React.Component {
  render() {
    let searchResults = this.props.currentResults || null;
    let isSearchFieldOpenSmallDevice = this.props.isSearchFieldOpenSmallDevice;
    if (isSearchFieldOpenSmallDevice === false) return null;
    if (searchResults.length > 0) {
      return (
        <div className="c-searchResults">
          {searchResults.map(result => {
          let hysId = createHysIdForItems(result.id,result.media_type);

            return (
              <Link
                className="c-result"
                key={result.id}
                id={result.id}
                to={{
                  pathname: `/details/${result.id}/${result.media_type}`,
                  state: {
                    contentId: result.id,
                    contentType: result.media_type,
                    hysId,
                    poster: result.media_type === "person" ? result.profile_path : result.backdrop_path,
                    release: result.media_type  === "tv" ? this.props.first_air_date : this.props.release_date,
                    title: this.props.title
                  }
                }}
                onClick={this.props.clearResults}
              >
                <div className="c-result__inner">
                  <ImageService
                    size="45"
                    photoPath={
                      result.media_type === "person"
                        ? result.profile_path
                        : result.poster_path
                    }
                    imageTitle={
                      result.media_type === "movie" ? result.title : result.name
                    }
                  />
                  <p>
                    {result.media_type === "movie" ? result.title : result.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  }
}
export default withRouter(Results);
