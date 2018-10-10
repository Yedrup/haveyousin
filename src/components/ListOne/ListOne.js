import React from "react";
import Card from "../Card/Card";
import IconService from "../../services/IconService";
import {
  withRouter
} from "react-router-dom";

import "./listOne.css";

class ListOne extends React.Component {
  state = {
    list: {},
    results: [],
    nameIcon: ""
  };

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        list: this.props.location.state.list,
        results: this.props.location.state.list.results,
        nameIcon: this.props.location.state.list.nameIcon
      });
    } else {
      return null
    }
  }

  componentDidUpdate(prevProps) {
    console.log("prevProps",prevProps)
    // // Typical usage (don't forget to compare props):
    if (this.props.match.params.listId !== prevProps.match.params.listId) {
      if(this.props.location.state) {
        this.setState({
          list: this.props.location.state.list,
          results: this.props.location.state.list.results,
          nameIcon: this.props.location.state.list.nameIcon
        });
      }else {
        return null
      }
    }
  }

  render() {

    const { results, nameIcon, list } = this.state;
    let ActionPannel = this.props.ActionPannel;

    return ( 
      <article>
        <header className="o-list__header o-list__title">
          <IconService nameIcon={nameIcon} iconStyleContext={{ color: "" }} />
          <span className="o-list__title__text">{nameIcon}</span>
        </header>
        <div className="o-list__cards">
          {results.map(function(content, index) {
            console.log("content", content);
            //TODO : recreate service for list regarding type :/
            let contentType;
            if (content.first_air_date) contentType = "tv";
            else if (content.release_date) contentType = "movie";
            else contentType = "person";
            return (
              <Card
                key={content.id + Date.now()}
                contentId={content.id}
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
      </article>
    );
  }
}

export default withRouter(ListOne);
