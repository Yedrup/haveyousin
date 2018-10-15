import React from "react";
import { Link } from "react-router-dom";
import "./results.css";
import ImageService from "../../services/ImageService";
import { withRouter } from "react-router-dom";

class Results extends React.Component {
  render() {
    let searchResults = this.props.currentResults || null;
    let isSearchFieldOpenSmallDevice = this.props.isSearchFieldOpenSmallDevice;
    if (isSearchFieldOpenSmallDevice === false) return null;
    if (searchResults.length > 0) {
      return (
        <div className="c-searchResults">
          {searchResults.map(result => {
            let suffixToConstructId;
            if (result.media_type === "tv") {
              suffixToConstructId = "s";
            } else if (result.media_type === "movie") {
              suffixToConstructId = "m";
            } else {
              suffixToConstructId = "p";
            }

            let hysId = `${result.id}${suffixToConstructId}`;

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
                    hysId
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
