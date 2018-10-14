import React from "react";
import IconService from "../../services/IconService";
import "../ListOne/listOne.css";
import { discoverMoviesLaps } from "../../services/tmdbService";
import Card from "../Card/Card";
import { withRouter } from "react-router-dom";

class Calendar extends React.Component {
  state = {
    today: new Date(),
    datas: []
  };

  discoverMovies = async () => {
    let datas = await discoverMoviesLaps();
    if (!datas) return null;
    console.log("datas :", datas);
    this.setState({
      datas: datas.results
    });
  };

  componentDidMount() {
    this.discoverMovies();
  }

  render() {
    const { ActionPannel } = this.props;
    console.log(this.state.datas);
    // test if offline
    // if (this.state.datas && this.state.datas.length <= 0) {
    //   return <div>Nothing there</div>;
    // }
    return (
      <div>
        <header className="o-list__header o-list__title">
          <IconService nameIcon="calendar" iconStyleContext={{ color: "" }} />
          <span className="o-list__title__text">
            {this.props.list.nameList}
          </span>
        </header>
        <div className="o-list__cards">
          {this.state.datas.map(function(content, index) {
            console.log("content", content);
            //TODO : recreate service for list regarding type :/
            let contentType;
            let suffixToConstructId;
            if (content.first_air_date) {
              contentType = "tv";
              suffixToConstructId = "s";
            } else if (content.release_date) {
              contentType = "movie";
              suffixToConstructId = "m";
            } else {
              contentType = "person";
              suffixToConstructId = "p";
            }

            let hysId = `${content.id}${suffixToConstructId}`;

            return (
              <Card
                key={content.id}
                contentId={content.id}
                hysId={hysId}
                title={content.title}
                release={content.release_date}
                poster={
                  content.media_type === "person"
                    ? content.profile_path
                    : content.poster_path
                }
                contentType={contentType}
                ActionPannel={ActionPannel}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(Calendar);
