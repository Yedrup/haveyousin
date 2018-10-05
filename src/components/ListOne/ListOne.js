import React from "react";
import Card from "../Card/Card";
import IconService from "../../services/IconService";
import {withRouter} from "react-router-dom";

import "./listOne.css";

class ListOne extends React.Component {

//   state = {
//     list : {},
//     results : [],
//     nameIcon : ""
//   }

//   componentDidMount() {
// console.log(this.props)
//     if (this.props.list) {
//     this.setState({
//       list : this.props.list,
//       results : this.props.list.results,
//       nameIcon : this.props.list.nameIcon
//     });
//   } else {
//     this.setState({
//       list : this.props.location.state.list,
//       results : this.props.location.state.list.results,
//       nameIcon : this.props.location.state.list.nameIcon
//     });
//   }


    // if (this.props.list) {
    //   list = this.props.list;
    //   results = this.props.list.results;
    //   nameIcon = this.props.list.nameIcon;
    // } else {
    //   list = this.props.location.state.list;
    //   results = this.props.location.state.list.results;
    //   nameIcon = this.props.location.state.list.nameIcon;
    // }
  // }

  // if (this.props.list) {
  //   list = this.props.list;
  //   results = this.props.list.results;
  //   nameIcon = this.props.list.nameIcon;
  // } else {
  //   list = this.props.location.state.list;
  //   results = this.props.location.state.list.results;
  //   nameIcon = this.props.location.state.list.nameIcon;
  // }
  render() {

    console.log(this.props)
    // console.log(this.state)

    let results;
    let nameIcon;
    let list;
    let ActionPannel = this.props.ActionPannel;

    // console.log(this.props.location)

    if (this.props.list) {
    list = this.props.list;
    results = this.props.list.results;
    nameIcon = this.props.list.nameIcon;
  } else {
    list = this.props.location.state.list;
    results = this.props.location.state.list.results;
    nameIcon = this.props.location.state.list.nameIcon;
  }

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
                key={content.id+Date.now()}
                contentId={content.id}
                title={content.title}
                release={content.release_date}
                poster={content.media_type === "person" ? content.profile_path  : content.poster_path}
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
