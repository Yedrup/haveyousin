import React from "react";
import { inject, observer } from "mobx-react";
import Card from "../Card/Card";
import IconService from "../../services/IconService";
import { withRouter } from "react-router-dom";
import "./listOne.css";
import { getThisListItems } from "../../services/listServiceHelper";

@inject("ListsStore")
@inject("ItemsStore")
@observer
class ListOne extends React.Component {
   componentDidMount() {
    // console.log("this.props ListOne", this.props);
  }

  render() {
    console.log("this.props.ListsStore.lists", this.props.ListsStore.lists, "this.props.match.params.listId", this.props.match.params.listId)
    let getThisList = this.props.ListsStore.lists[this.props.match.params.listId];
    let itemsFromThisList = getThisListItems(
      getThisList.itemsInThisList,
      this.props.ItemsStore.allItems
    );
  
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
            let contentType;
            if (content.first_air_date || content.contentType === "tv" ) contentType = "tv";
            else if (content.release_date || content.contentType === "movie" ) contentType = "movie";
            else contentType = "person";
            return (
              <Card
                key={content.hysId}
                contentId={content.id}
                hysId={content.hysId}
                overview={content.overview}
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
