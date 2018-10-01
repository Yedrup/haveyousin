import React from "react";
import IconService from "../../services/IconService";
import "./actionPannel.css";

class ActionPannel extends React.Component {
  // addToWatchList(id) {
  //   console.log("log from function addToWatchList with id:", id);
  // }

  // addToArchives(id) {
  //   console.log("log from function addToArchives with id:", id);
  // }

  // addToFavorite(id) {
  //   console.log("log from function addToFavorite with id:", id);
  // }

  // addToCustomLists(id) {
  //   console.log("log from function addToCustomLists with id:", id);
  // }
  render() {
    console.log(this.props)

    let contentId = this.props.contentId;
    console.log(this.props)
    const actionPannelItems = [
      { title: "toWatchList", action: () => this.props.addToWatchList(contentId) },
      { title: "archives", action: () => this.props.addToArchives(contentId) },
      { title: "favorites", action: () => this.props.addToFavorite(contentId) },
      { title: "customLists", action: () => this.props.addToCustomLists(contentId) }
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
