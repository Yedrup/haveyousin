import React from "react";
import "./details.css";
import { withRouter } from "react-router-dom";
import {
  getDetailsMovie,
  getDetailsTV,
  getDetailsPeople
} from "../../services/tmdbService";
import ImageService from "../../services/ImageService";
// import ActionPannel from "../ActionPannel/ActionPannel";

class Details extends React.Component {
  state = {
    details: [],
    poster: "",
    title: "",
    release:"",
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
          loaded: true
        });
      } catch (error) {
        console.log(error);
      }
    } else if (contentType === "tv") {
      try {
        console.log(contentType);
        let details = await getDetailsTV(contentId);
        console.log("details : ", details);
        this.setState({
          details,
          poster: details.poster_path,
          title: details.name,
          release: details.first_air_date,
          contentId: details.id,
          loaded: true
        });
      } catch (error) {
        console.log(error);
      }
    } else if (contentType === "movie") {
      try {
        console.log(contentType);
        let details = await getDetailsMovie(contentId);
        console.log("details : ", details);
        this.setState({
          details,
          poster: details.poster_path,
          title: details.title,
          release: details.release_date,
          contentId: details.id,
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
      details: [],
      poster: "",
      release:"",
      title: "",
      contentId:"",
      loaded: false
    });
  }

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
    let {poster, title, contentId, release} = this.state;
    console.log("this.stateee",this.state)
    return (
      <section className="c-details">
        <header className="c-detail__header">
          <ImageService
            size="185"
            photoPath={poster}
            imageTitle={title}
          />
          <h1 className="c-detail__title">{title}</h1>
        </header>
        <p>
          DETAILS of content id {contentId} and titled {title}
        </p>
        <div className="c-detail__pannel">
          {React.cloneElement(
            ActionPannel,
            { 
            contentId: contentId ,
            hysId : this.props.location.state.hysId,
            contentType: this.props.location.state.contentType, 
            poster: poster,
            release: release,
            title: title
          }
          )}
        </div>
      </section>
    );
  }
}

export default withRouter(Details);
