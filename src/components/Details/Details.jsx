import React from "react";
import "./details.css";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  getDetailsMovie,
  getDetailsTV,
  getDetailsPeople
} from "../../services/tmdbService";
import ListDiplay from "../../components/ListDisplay/ListDisplay";
import ImageService from "../../services/ImageService";
// import ActionPannel from "../ActionPannel/ActionPannel";
import {
  createHysIdForItems,
  defineContentType
} from "../../services/listServiceHelper";

//TODO: create render function for tv, movie, person test credits
console.log(this.props);
class Details extends React.Component {
  state = {
    details: {}
  };
  getDetails = async (id, type) => {
    let contentId = id;
    let contentType = type;
    if (contentType === "person") {
      try {
        let details = await getDetailsPeople(contentId, "combined_credits");
        console.log("details : ", details);
        this.setState({
          details
        });
      } catch (error) {
        console.log(error);
        // this.setState({ details: {}, loaded: false });
      }
    } else if (contentType === "tv") {
      try {
        console.log(contentType);
        let details = await getDetailsTV(contentId, "credits,videos");
        console.log("details : ", details);
        this.setState({
          details
        });
      } catch (error) {
        console.log(error);
      }
    } else if (contentType === "movie") {
      try {
        // console.log(contentType);
        let details = await getDetailsMovie(contentId, "credits,videos");
        console.log("details : ", details);
        this.setState({
          details
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  componentDidMount() {
    this.getDetails(
      this.props.location.state.contentId,
      this.props.location.state.contentType
    );
  }
  componentWillUnmount() {
    this.setState({
      details: {}
    });
  }

  //update local state with deriveddata
  componentWillReceiveProps(nextProps) {
    if (
      this.props.match.params.contentId !== nextProps.match.params.contentId
    ) {
      this.setState({
        details: {}
      });
      this.getDetails(
        nextProps.match.params.contentId,
        nextProps.match.params.contentType
      );
    }
  }
  render() {
    let contentType = this.props.location.state.contentType;
    console.log("contentType", contentType);
    let ActionPannel = this.props.ActionPannel;
    console.log("this.stateee", this.state);
    console.log("this.props", this.props);

    if (
      this.state.details &&
      this.state.details.id !== null &&
      this.state.details.id !== undefined
    ) {
      if (contentType !== "person") {
        let title = this.state.details.title;
        let release = this.state.details.release_date;
        // let release = this.state.details.first_air_date;
        let cast = this.state.details.credits.cast;
        let crew = this.state.details.credits.crew;
        let poster = this.state.details.poster_path;
        let contentId = this.state.details.id;
        let overview = this.state.details.overview;

        let mainCharacters = cast.splice(0, 10);
        let secondaryCharacters = cast.splice(0, cast.length);

        return (
          <section className="c-details">
            <header className="c-detail__header">
              <div>
                <ImageService
                  size="185"
                  photoPath={poster}
                  imageTitle={title}
                />
                {React.cloneElement(ActionPannel, {
                  contentId: contentId,
                  hysId: this.props.location.state.hysId,
                  contentType: this.props.location.state.contentType,
                  poster: poster,
                  release: release,
                  title: title
                })}
              </div>
              <div className="c-details__header__infos">
                <h1 className="c-detail__title">
                  {title} <span className="c-detail__release">({release})</span>
                </h1>
                <p className="c-detail__sinopsis">{overview}</p>
              </div>
            </header>
            <main>
              <h4>Main characters</h4>
              {/* TODO:  use component for ul display*/}
              <ul className="c-cast-main">
                {mainCharacters.map(character => {
                  let hysId = createHysIdForItems(
                    character.credit_id,
                    "person"
                  );
                  return (
                    <li className="c-cast-main__item" key={character.credit_id}>
                      <Link
                        to={{
                          pathname: `/details/${character.id}/person`,
                          state: {
                            contentId: character.id,
                            hysId,
                            contentType: "person",
                            poster: character.poster,
                            release: release,
                            title: title
                          }
                        }}
                      >
                        <ImageService
                          size="92"
                          photoPath={character.profile_path}
                          imageTitle={character.character}
                        />
                        <p className="c-people__name c-people__name--character">
                          {character.character}
                          <span className="c-people__name__actor">
                            {character.name}
                          </span>
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <h4>Secondary characters</h4>
              <ul className="c-cast__list">
                {/* TODO:  create component for ul display*/}
                {secondaryCharacters.map(character => {
                  let hysId = createHysIdForItems(
                    character.credit_id,
                    "person"
                  );
                  return (
                    <li
                      className="c-cast__list__item"
                      key={character.credit_id}
                    >
                      <p className="c-people__name--text-only c-people__name--text-only--character">{character.character}</p>
                      <Link
                        className="c-people__name--text-only"
                        to={{
                          pathname: `/details/${character.id}/person`,
                          state: {
                            contentId: character.id,
                            hysId,
                            contentType: "person",
                            poster: character.poster,
                            release: release,
                            title: title
                          }
                        }}
                      >
                        {character.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </main>
          </section>
        );
      } else {
        let name = this.state.details.name;
        let playedInList = this.state.details.combined_credits.cast;
        let poster = this.state.details.profile_path;
        let contentId = this.state.details.id;
        let overview = this.state.details.overview;
        //TODO ListHelper
        const orderedPlayedInList = playedInList.sort((a, b) => {
          let aNum = a.release_date ? a.release_date : a.first_air_date;
          let bNum = b.release_date ? b.release_date : b.first_air_date;
          if (aNum === undefined) {
            aNum = "0000-00-00";
          }
          if (bNum === undefined) {
            bNum = "0000-00-00";
          }
          return aNum <= bNum ? 1 : -1;
        });
        return (
          <section className="c-details">
            <header className="c-detail__header">
              <ImageService
                size="185"
                photoPath={this.state.details.profile_path}
                imageTitle={name}
              />
              <div className="c-details__header__infos">
                <h1 className="c-detail__title">{name}</h1>
                <p className="c-detail__sinopsis">
                  {this.state.details.biography}
                </p>
                <p className="">{this.state.details.birthday}</p>
              </div>
              <div className="c-detail__pannel">
                {React.cloneElement(ActionPannel, {
                  contentId: contentId,
                  hysId: this.props.location.state.hysId,
                  contentType: this.props.location.state.contentType,
                  poster: poster,
                  release: null,
                  title: name
                })}
              </div>
            </header>
            <main className="c-details__main">
              <h3 className="c-list__title">Actoring</h3>
              <ul className="c-list">
                {playedInList.map(role => {
                  // console.log(role)
                  return (
                    <ListDiplay type="role" key={role.credit_id} data={role} />
                  );
                })}
              </ul>
            </main>
          </section>
        );
      }
    } else {
      //TODO : check if has network, after 2 sec without response => display message network status + loop
      if (navigator.onLine) {
        return <p>Loading...</p>;
      } else {
        return <p>It seems you don't have network...</p>;
      }
    }
  }
}

export default withRouter(Details);
