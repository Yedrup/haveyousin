import React from "react";
import "./details.css";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  getDetailsMovie,
  getDetailsTV,
  getDetailsPeople
} from "../../services/tmdbService";
import ImageService from "../../services/ImageService";
// import ActionPannel from "../ActionPannel/ActionPannel";
import {createHysIdForItems, defineContentType} from "../../services/listServiceHelper";

//TODO: create render function for tv, movie, person test credits
console.log(this.props)
class Details extends React.Component {
  
  state = {
    details: {},
    poster: "",
    title: "",
    release: "",
    overview: "",
    cast: [],
    crew: [],
    loaded: false
  };
  getDetails = async (id, type) => {
    let contentId = id;
    let contentType = type;
    if (contentType === "person") {
      try {
        let details = await getDetailsPeople(contentId, "combined_credits");
        console.log("details : ", details);
        this.setState({
          details,
          poster: details.profile_path,
          contentId: details.id,
          title: details.name,
          overview: details.biography,
          cast: details.combined_credits.cast,
          crew: "",
          loaded: true
        });
      } catch (error) {
        console.log(error);
      }
    } else if (contentType === "tv") {
      try {
        console.log(contentType);
        let details = await getDetailsTV(contentId, "credits,videos");
        console.log("details : ", details);
        this.setState({
          details,
          poster: details.poster_path,
          title: details.name,
          release: details.first_air_date,
          contentId: details.id,
          overview: details.overview,
          cast: details.credits.cast,
          crew: details.credits.crew,
          loaded: true
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
          details,
          poster: details.poster_path,
          title: details.title,
          release: details.release_date,
          contentId: details.id,
          overview: details.overview,
          cast: details.credits.cast,
          crew: details.credits.crew,
          loaded: true
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
      details: {},
      poster: "",
      release: "",
      title: "",
      contentId: "",
      overview: "",
      cast: [],
      crew: [],
      loaded: false
    });
  }

  /*
        vm.mainCharacters = vm.contentDetails.credits.cast.splice(0, 9);
        vm.secondCharacters = vm.contentDetails.credits.cast.splice(0, vm.contentDetails.credits.cast.length);

    //people 
    tmdbService
      .getDetailsPeople(id, 'combined_credits')
      .then(function (response) {

        vm.actoringOrigin = vm.contentDetails.combined_credits.cast;
        vm.actoringIn = listsService.keyChange(vm.actoringOrigin, vm.actoringIn, 'first_air_date', 'release_date');
        vm.actoringIn = listsService.keyChange(vm.actoringOrigin, vm.actoringIn, 'name', 'title');          
      });

  }*/
//update local state with deriveddata
  componentWillReceiveProps(nextProps) {
    if (
      this.props.match.params.contentId !== nextProps.match.params.contentId
    ) {
      this.getDetails(
        nextProps.match.params.contentId,
        nextProps.match.params.contentType
      );
    }
  }
  render() {
    let ActionPannel = this.props.ActionPannel;
    let {
      poster,
      title,
      contentId,
      release,
      overview,
      cast,
      crew
    } = this.state;
    let mainCharacters = cast.splice(0, 9);
    let secondaryCharacters = cast.splice(0, cast.length);

    console.log("this.stateee", this.state);
    console.log("this.props", this.props);
    return (
      <section className="c-details">
        <header className="c-detail__header">
          <ImageService size="185" photoPath={poster} imageTitle={title} />
          <div className="c-details__header__infos">
            <h1 className="c-detail__title">{title}</h1>
            <p className="c-detail__sinopsis">Sinopsis : {overview}</p>
            <div className="c-detail__pannel">
              {React.cloneElement(ActionPannel, {
                contentId: contentId,
                hysId: this.props.location.state.hysId,
                contentType: this.props.location.state.contentType,
                poster: poster,
                release: release,
                title: title
              })}
            </div>
          </div>
          <p className="">{release}</p>
        </header>
        <main>
        <h4>Main characters</h4>
          <ul className="c-cast-main">
            {mainCharacters.map(character => {
              let hysId = createHysIdForItems(character.credit_id,"person");
              return (
                <li className="c-cast-main__item" key={character.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w92${
                      character.profile_path
                    }`}
                    alt={`${character.character}`}
                  />
                  <p className="c-people__name c-people__name--character">
                    {character.character}
                  </p>
                </li>
              );
            })}
          </ul>
          <h4>Secondary characters</h4>
          <ul className="c-cast__list">
            {secondaryCharacters.map(character => {
              let hysId = createHysIdForItems(character.credit_id,"person");
              return (
                <li className="c-cast__list__item" key={character.id}>
                  <p className="c-people__name--text-only">
                    {character.character}
                  </p>
                  <Link 
                  className="c-people__name--text-only"
                  to={{
                    pathname: `/details/${character.id}/person`
                    ,
                    state: {
                      // contentId: character.credit_id,
                      // contentType: "person",
                      // hysId,
                      // poster: character.profile_path,
                      // // release: result.media_type  === "tv" ? this.props.first_air_date : this.props.release_date,
                      // title: this.props.title
                      contentId: character.id,
                      hysId,
                      contentType: "person",
                      poster: character.poster,
                      release: release,
                      title: title
                    }
                  }}
                  >{character.name}</Link>
                </li>
              );
            })}
          </ul>

          {/* <div ng-if="detailCtrl.type !== 'people' && detailCtrl.mainCharacters !== 0" className="c-cast">
        <h3>Main Characters</h3>
        <ul className="c-cast-main">
            <li ng-repeat=" character in detailCtrl.mainCharacters" className="c-cast-main__item">
                <a ui-sref="root.detailContent({type:'people',id:character.id, title:character.name})" className="c-thumbnail-wrap">
                    <article className="c-thumbnail--people">
                        <img ng-src="https://image.tmdb.org/t/p/w92{{character.profile_path}}" alt="{{character.character}}">
                        <p className="c-people__name c-people__name--character">
                            {{character.character}}</p>
                        <p className="c-people__name--text-only">({{character.name}})</p>
                    </article>
                </a>
            </li>
        </ul>
        
        <div ng-if="detailCtrl.secondCharacters !=0">

            <h4>Second charactors</h4>
            <ul className="c-cast__list">
                <li className="c-cast__list__item" ng-repeat="character in detailCtrl.secondCharacters">
                    <p className="c-people__name--text-only">{{character.character}}</p>
                    <a ui-sref="root.detailContent({type:'people',id:character.id, title:character.name})" className="c-people__name--text-only">{{character.name}}
                    </a>
                </li>
            </ul>
        </div>
    </div> 
    
     <div ng-if="detailCtrl.type === 'people'" className="c-cast">
        <h3>Actoring</h3>
        <ul className="c-cast__list">
            <li className="c-cast__list__item" ng-repeat="cast in      detailCtrl.actoringIn | orderBy : '-release_date'">
                <p className="c-people__name--text-only">{{cast.release_date? cast.release_date : "____" | date:'yyyy' }}</p>
                <i className="o-icon--white c-card__icon c-card__icon--type  fa fa-{{cast.media_type === 'tv' ? 'television' : 'film'}}" aria-hidden="true"></i>
                <a ui-sref="root.detailContent({type:cast.media_type === 'tv'? 'tv': 'movie',id:cast.id, title:cast.title})">{{cast.title}}</a>
                <p className="c-people__name--text-only">{{cast.character}}</p>
            </li>
        </ul>
    </div>
    
    
    */}
        </main>
      </section>
    );
  }
}

export default withRouter(Details);
