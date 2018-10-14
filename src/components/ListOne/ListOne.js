import React from "react";
import Card from "../Card/Card";
import IconService from "../../services/IconService";
import { withRouter } from "react-router-dom";
import {
  setInLocalStorage,
  getFromLocalStorage
} from "../../services/localStorageService";
import "./listOne.css";

class ListOne extends React.Component {
  state = {
    list: {},
    results: [],
    nameIcon: ""
  };

  //TODO: service/helper with this function
  getItemForThisList = (itemsInThisList, listOfItems) => {
    console.log(" listOfItems", listOfItems);
    console.log(" itemsInThisList", itemsInThisList);

    const filtered = Object.keys(listOfItems)
      .filter(key => itemsInThisList.includes(key))
      .reduce((obj, key) => {
        obj[key] = listOfItems[key];
        return obj;
      }, {});
    console.log(filtered);
    return filtered;
  };

  componentDidMount() {
    console.log(this.props.location);
    console.log("this.props ListOne", this.props);

    if (this.props.location.state && this.props.location.state.list) {
      let itemsFromThisList = this.getItemForThisList(
        this.props.location.state.list.itemsInList,
        this.props.location.state.itemsInList.byId
      );

      this.setState({
        list: this.props.location.state.list,
        results: itemsFromThisList,
        nameIcon: this.props.location.state.list.nameIcon
      });
      setInLocalStorage("miaou", this.props.location.state.list);
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps) {
    console.log("prevProps", prevProps);
    console.log(this.props.location);
    if (
      this.props.match.params.listId !== prevProps.match.params.listId &&
      (this.props.location.state && this.props.location.state.list)
    ) {
      let itemsFromThisList = this.getItemForThisList(
        this.props.location.state.list.itemsInList,
        this.props.location.state.itemsInList.byId
      );
      this.setState({
        list: this.props.location.state.list,
        results: itemsFromThisList,
        nameIcon: this.props.location.state.list.nameIcon
      });
      setInLocalStorage("miaou", this.props.location.state.list);
    } else {
      return null;
    }
  }

  render() {
    const { results, nameIcon, list } = this.state;
    let ActionPannel = this.props.ActionPannel;

    return (
      <article>
        <header className="o-list__header o-list__title">
          <IconService
            nameIcon={nameIcon}
            iconStyleContext={{
              color: ""
            }}
          />
          <span className="o-list__title__text"> {nameIcon} </span>
        </header>
        <div className="o-list__cards">
          {Object.values(results).map(content => {
            console.log("content", content.hysId);
            //TODO : recreate service for list regarding type :/
            let contentType;
            if (content.first_air_date) contentType = "tv";
            else if (content.release_date) contentType = "movie";
            else contentType = "person";
            return (
              <Card
                key={content.hysId}
                contentId={content.id}
                hysId={content.hysId}
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
