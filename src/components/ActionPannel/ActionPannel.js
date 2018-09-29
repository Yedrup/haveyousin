import React from "react";
import IconService from "../../services/IconService";
import "./actionPannel.css";

class ActionPannel extends React.Component {
  addToWatchList(id) {
    console.log("log from function addToWatchList with id:", id);
  }

  addToArchives(id) {
    console.log("log from function addToArchives with id:", id);
  }

  addToFavorite(id) {
    console.log("log from function addToFavorite with id:", id);
  }

  addTocustomLists(id) {
    console.log("log from function addTocustomLists with id:", id);
  }
  render() {
    let contentId = this.props.contentId;
    console.log(this.props)
    const actionPannelItems = [
      { title: "toWatchList", action: () => this.addToWatchList(contentId) },
      { title: "archives", action: () => this.addToArchives(contentId) },
      { title: "favorites", action: () => this.addToFavorite(contentId) },
      { title: "customLists", action: () => this.addTocustomLists(contentId) }
    ];
    if (this.props.contentType !== "person") {
      return (
        <ul className="c-actionPannel">
          {actionPannelItems.map(function(pannelItem, index) {
            let buttonName = pannelItem.title;
            return (
              <li key={index} onClick={pannelItem.action}>
                <IconService
                  nameIcon={buttonName}
                  iconStyleContext={{ color: "" }}
                />
              </li>
            );
          })}
        </ul>
      );
    } else {
      return (
        <span onClick={() => this.addToFavorite(contentId)}>
        <IconService
          nameIcon={"favorites"}
          iconStyleContext={{ color: "" }}
        />
        </span>
      );
    }
  }
}

export default ActionPannel;
