import React from "react";
import { inject, observer } from "mobx-react";
import Card from "../Card/Card";
import IconService from "../../services/IconService";
import { withRouter } from "react-router-dom";
import {
  setInLocalStorage,
  getFromLocalStorage
} from "../../services/localStorageService";
import "./listOne.css";
import { getOneList, getThisListItems } from "../../services/listServiceHelper";

@inject("ListsStore")
@inject("ItemsStore")
@observer
class ListOne extends React.Component {
 
  //idea : not passing by router anymore, use store
  componentDidMount() {
    // console.log("this.props ListOne", this.props);
  }

  render() {
    let getThisList = getOneList(
      this.props.ListsStore.lists,
      this.props.match.params.listId
    );
    //get items to render
    let itemsFromThisList = getThisListItems(
      getThisList.itemsInThisList,
      this.props.ItemsStore.allItems
    );
    // console.log("listOne get this list",getThisList);
    // console.log("listOne get items",itemsFromThisList);

    let ActionPannel = this.props.ActionPannel;

    return (
      <article>
        <header className="o-list__header o-list__title">
          <IconService
            nameIcon={getThisList.nameIcon}
            iconStyleContext={{
              color: ""
            }}
          />
          <span className="o-list__title__text"> {getThisList.nameIcon} </span>
        </header>
        <div className="o-list__cards">
          {Object.values(itemsFromThisList).map(content => {
            // console.log("content", content.hysId);
            let contentType;
            if (content.first_air_date || content.contentType === "tv" ) contentType = "tv";
            else if (content.release_date || content.contentType === "movie" ) contentType = "movie";
            else contentType = "person";
            return (
              <Card
                key={content.hysId}
                contentId={content.id}
                hysId={content.hysId}
                title={content.title}
                release={content.release}
                poster={content.poster}
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
