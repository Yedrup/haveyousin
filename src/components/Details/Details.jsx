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
    photo: "",
    name: "",
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
          photo: details.profile_path,
          contentId: details.id,
          name: details.name,
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
          photo: details.poster_path,
          name: details.name,
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
          photo: details.poster_path,
          name: details.title,
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
      photo: "",
      name: "",
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
    return (
      <section className="c-details">
        <header className="c-detail__header">
          <ImageService
            size="185"
            photoPath={this.state.photo}
            imageTitle={this.state.name}
          />
          <h1 className="c-detail__title">{this.state.name}</h1>
        </header>
        <p>
          DETAILS of content id {this.state.contentId} and named
          {this.state.name}
        </p>
        <div className="c-detail__pannel">
          {React.cloneElement(
            ActionPannel,
            { 
            contentId: this.state.contentId ,
            hysId : this.props.location.state.hysId,
            contentType: this.props.location.state.contentType, 
            poster: this.props.location.state.poster,
            release: this.props.location.state.release,
            title: this.props.location.state.title
          }
          )}
        </div>
      </section>
    );
  }
}

export default withRouter(Details);
