import React from "react";
import Card from "../Card/Card";
import IconService from "../../services/IconService";
import "./listOne.css";

class ListOne extends React.Component {
  render() {
    let results;
    let nameIcon;
    let list;
    console.log(this.props);
    if (this.props.list) {
      list = this.props.list;
      results = this.props.list.results;
      nameIcon = this.props.list.nameIcon;
    } else {
      list = this.props.location.state.list;
      results = this.props.location.state.list.results;
      nameIcon = this.props.location.state.list.nameIcon;
    }
    console.log("results", results);
    console.log("list", list);
    //the card need to be less oriented , the type passes by a prop
    return (
      <article>
        <header className="o-list__header o-list__title">
          <IconService nameIcon={nameIcon} iconStyleContext={{ color: "" }} />
          <span className="o-list__title__text">{nameIcon}</span>
        </header>
        <div className="o-list__cards">
          {results.map(function(content, index) {
            console.log("content",content);
            //TODO : recreate service for list regarding type :/
            let contentType;
            if(content.first_air_date) contentType = 'tv'
            else if(content.release_date) contentType = 'movie'
            else contentType = 'person'

            return (
              <Card
                key={content.id}
                contentId={content.id}
                title={content.title}
                release={content.release_date}
                poster={content.media_type === "person" ? content.profile_path  : content.poster_path}
                contentType={contentType}
              />
            );
          })}
        </div>
      </article>
    );
  }
}

export default ListOne;
