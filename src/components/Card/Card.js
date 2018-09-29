import React from "react";
import MediaQuery from "react-responsive";
import Truncate from "react-truncate";
import { Link } from "react-router-dom";
import ActionPannel from "../ActionPannel/ActionPannel";
import ImageService from "../../services/ImageService";
import "./card.css";

class Card extends React.Component {
  render() {
    console.log("props from card", this.props);
    if (this.props.contentType !== "person") {
      return (
        <article className="c-card">
          <MediaQuery maxWidth={767}>
            <Link
              to={{
                pathname: `/details/${this.props.contentId}/${
                  this.props.contentType
                }`,
                state: {
                  contentId: this.props.contentId,
                  contentType: this.props.contentType
                }
              }}
            >
              <ImageService
                size="92"
                photoPath={this.props.poster}
                imageTitle={this.props.title}
              />
            </Link>
            <div className="c-card__body--small">
              <header className="c-card__header">
                <h2 className="c-card__title">
                  <Link
                    to={{
                      pathname: `/details/${this.props.contentId}/${
                        this.props.contentType
                      }`,
                      state: {
                        contentId: this.props.contentId,
                        contentType: this.props.contentType
                      }
                    }}
                  >
                    <Truncate
                      lines={1}
                      ellipsis={"..."}
                      trimWhitespace
                      width={200}
                    >
                      {this.props.title}
                    </Truncate>
                  </Link>
                </h2>
                <span className="c-card__secondary-info c-card__date">
                  {this.props.release}
                </span>
              </header>
              <p className="c-card__secondary-info c-card__secondary-info-text">
                genre
              </p>
              <p className="c-card__secondary-info c-card__secondary-info-text">
                Actors: Tom Ellis, Lauren German , Lesley-Ann Brandt...
              </p>
              <footer>
                <ActionPannel contentId={this.props.contentId} />
              </footer>
            </div>
          </MediaQuery>
          <MediaQuery minWidth={767}>
            <Link
              className=""
              to={{
                pathname: `/details/${this.props.contentId}/${
                  this.props.contentType
                }`,
                state: {
                  contentId: this.props.contentId,
                  contentType: this.props.contentType
                }
              }}
            >
              <header className="c-card__header">
                <h2 className="c-card__title">
                  <Truncate lines={1} ellipsis={"..."}>
                    {this.props.title}
                  </Truncate>
                </h2>
                <span className="c-card__secondary-info c-card__date">
                  {this.props.release}
                </span>
              </header>
              <ImageService
                size="185"
                photoPath={this.props.poster}
                imageTitle={this.props.title}
              />
            </Link>
            <footer>
              <ActionPannel
                contentId={this.props.contentId}
                contentType={this.props.contentType}
              />
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
              pathname: `/details/${this.props.contentId}/${
                this.props.contentType
              }`,
              state: {
                contentId: this.props.contentId,
                contentType: this.props.contentType
              }
            }}
          >
            <ImageService
              size="185"
              photoPath={this.props.poster}
              imageTitle={this.props.title}
            />
          </Link>
          <figcaption>{this.props.title}</figcaption>
          <ActionPannel
            contentId={this.props.contentId}
            contentType={this.props.contentType}
          />
        </figure>
      );
    }
  }
}

export default Card;
