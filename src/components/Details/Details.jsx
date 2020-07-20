import React, { Component, cloneElement } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  getDetailsMovie,
  getDetailsTV,
  getDetailsPeople,
} from '../../services/tmdbService';
import ListDisplay from '../../components/ListDisplay/ListDisplay';
import ImageService from '../../services/ImageService';
import { createHysIdForItems } from '../../services/listServiceHelper';
import './details.css';

const MAX_MAIN_CHARACTERS_COUNT = 12;
class Details extends Component {
  state = {
    details: {},
  };

  getDetails = async (id, type) => {
    let contentType = type;
    ///FIXME : on refresh id and type are 'tv' 'tv' (for tv content only);
    let contentId = id !== type ? id : window.location.pathname.split('/')[3];
    if (!contentType) {
      contentType = window.location.pathname.split('/').pop();
    }
    if (contentType === 'person') {
      try {
        let details = await getDetailsPeople(contentId, 'combined_credits');
        this.setState({
          details,
        });
      } catch (error) {
        console.log(error);
      }
    } else if (contentType === 'tv') {
      try {
        let details = await getDetailsTV(contentId, 'credits,videos');
        this.setState({
          details,
        });
      } catch (error) {
        console.log(error);
      }
    } else if (contentType === 'movie') {
      try {
        let details = await getDetailsMovie(contentId, 'credits,videos');
        this.setState({
          details,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  componentDidMount() {
    const { contentId, contentType } = this.props.location.state;
    this.getDetails(contentId, contentType);
  }

  componentWillUnmount() {
    this.setState({
      details: {},
    });
  }
  //update local state with derived data
  componentWillReceiveProps(nextProps) {
    const {
      contentId: nextContentId,
      contentType: nextContentType,
    } = nextProps.match.params;

    if (this.props.match.params.contentId !== nextContentId) {
      this.setState({
        details: {},
      });
      this.getDetails(nextContentId, nextContentType);
    }
  }
  render() {
    const { contentType, hysId } = this.props.location.state;
    let { ActionPanel } = this.props;

    if (
      this.state.details &&
      this.state.details.id !== null &&
      this.state.details.id !== undefined
    ) {
      if (contentType !== 'person') {
        const {
          release_date: release,
          name,
          credits,
          title: tvTitle,
          poster_path: poster,
          id: contentId,
          overview,
        } = this.state.details;

        let title = contentType === 'tv' ? name : tvTitle;

        let { cast, crew } = credits;

        let mainCharacters = cast.splice(0, MAX_MAIN_CHARACTERS_COUNT);
        let isMainCharacters = mainCharacters.length > 0;
        let secondaryCharacters = cast.splice(0, cast.length);
        let isSecondaryCharacter = secondaryCharacters.length > 0;

        const SecondaryCharacters = () => {
          if (isSecondaryCharacter) {
            return (
              <div>
                <h4 className="c-detail__subtitle">Secondary characters</h4>
                <ul className="c-cast__list">
                  {/* TODO:  create component for ul display*/}
                  {secondaryCharacters.map(
                    ({ credit_id, id, poster, name, character }) => {
                      let hysId = createHysIdForItems(credit_id, 'person');
                      return (
                        <li className="c-cast__list__item" key={credit_id}>
                          <p className="c-people__name--text-only c-people__name--text-only--character">
                            {character}
                          </p>
                          <Link
                            className="c-people__name--text-only"
                            to={{
                              pathname: `/details/${id}/person`,
                              state: {
                                contentId: id,
                                hysId,
                                contentType: 'person',
                                poster,
                                release,
                                title,
                              },
                            }}
                          >
                            {name}
                          </Link>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            );
          } else {
            return null;
          }
        };

        const MainCharacters = () => {
          if (isMainCharacters) {
            return (
              <div>
                <h4 className="c-detail__subtitle">Main characters</h4>
                <ul className="c-cast-main">
                  {mainCharacters.map(
                    ({
                      credit_id,
                      id,
                      poster,
                      name,
                      profile_path,
                      character,
                    }) => {
                      let hysId = createHysIdForItems(credit_id, 'person');
                      return (
                        <li className="c-cast-main__item" key={credit_id}>
                          <Link
                            to={{
                              pathname: `/details/${id}/person`,
                              state: {
                                contentId: id,
                                hysId,
                                contentType: 'person',
                                poster,
                                release,
                                title,
                              },
                            }}
                            className="c-cast-main__link"
                          >
                            <ImageService
                              size="92"
                              photoPath={profile_path}
                              imageTitle={character}
                            />
                            <p className="c-people__name c-people__name--character">
                              {character}
                              <span className="c-people__name__actor">
                                {name}
                              </span>
                            </p>
                          </Link>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            );
          } else {
            return false;
          }
        };

        return (
          <section className="c-details">
            <header className="c-detail__header">
              <div className="c-detail__image">
                <ImageService
                  size="185"
                  photoPath={poster}
                  imageTitle={title}
                />

                {cloneElement(ActionPanel, {
                  contentId,
                  hysId,
                  contentType,
                  poster,
                  release,
                  title,
                })}
              </div>
              <div className="c-details__header__infos">
                <h1 className="c-detail__title">
                  {title}
                  <span className="c-detail__header__date">
                    {release ? `(${release})` : ''}
                  </span>
                </h1>
                <p className="c-detail__synopsis">{overview}</p>
              </div>
            </header>
            <div className="sections">
              <MainCharacters />
              <SecondaryCharacters />
            </div>
          </section>
        );
      } else {
        const {
          name,
          overview,
          combined_credits,
          profile_path: poster,
          id: contentId,
          birthday,
          deathday,
          biography,
        } = this.state.details;

        let playedInList = combined_credits.cast;

        const orderedPlayedInList = playedInList.sort((a, b) => {
          let aNum = a.release_date ? a.release_date : a.first_air_date;
          let bNum = b.release_date ? b.release_date : b.first_air_date;
          if (aNum === undefined) {
            aNum = '0000-00-00';
          }
          if (bNum === undefined) {
            bNum = '0000-00-00';
          }
          return aNum <= bNum ? 1 : -1;
        });
        return (
          <section className="c-details">
            <header className="c-detail__header">
              <div className="c-detail__image">
                <ImageService size="185" photoPath={poster} imageTitle={name} />
              </div>
              <div className="c-details__header__infos">
                <h1 className="c-detail__title ">
                  {name}
                  <span className="c-detail__header__date">
                    {birthday}
                    {deathday ? `- ${deathday}` : ''}
                  </span>
                </h1>
                <p className="c-detail__synopsis">{biography}</p>
              </div>
              {/* <div className="c-detail__panel">
                {cloneElement(ActionPanel, {
                  contentId,
                  hysId,
                  contentType,
                  poster,
                  release: null,
                  title: name,
                })}
              </div> */}
            </header>
            <div className="c-details__main">
              <h3 className="c-detail__subtitle">Acting</h3>
              <ul className="c-list">
                {playedInList.map((role) => {
                  return (
                    <ListDisplay type="role" key={role.credit_id} data={role} />
                  );
                })}
              </ul>
            </div>
          </section>
        );
      }
    } else {
      if (navigator.onLine) {
        return <p>Loading...</p>;
      } else {
        return <p>It seems you don't have network...</p>;
      }
    }
  }
}

export default withRouter(Details);
