import React from "react";
import IconService from "../../services/IconService";
import "./actionPannel.css";
import { withRouter } from "react-router-dom";

class ActionPannel extends React.Component {
  render() {
    // console.log("ActionPannel this.props", this.props);
    const {addItemToList,addToCustomList } = this.props;
    // let contentId = this.props.contentId;
    let hysId = this.props.hysId;
    // console.log("hysId", hysId)
    let listId;
    if(this.props.match.params.listId) {
      listId = this.props.match.params.listId;
      // console.log(listId)
    }
    const actionPannelItems = [
      {
        title: "toWatchList",
        action: () => addItemToList(hysId,1)
      },
      {
        title: "archives",
        action: () => addItemToList(hysId,2)
      },
      {
        title: "favorites",
        action: () => addItemToList(hysId,3)
      },
      {
        title: "customLists",
        action: () => addToCustomList(hysId,"custom")
      }
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
                  iconStyleContext={{
                    color: ""
                  }}
                />
              </li>
            );
          })}
        </ul>
      );
    } else {
      return (
        <span onClick={() => this.addToCustomList(hysId,listId)}>
          <IconService
            nameIcon={"favorites"}
            iconStyleContext={{
              color: ""
            }}
          />
        </span>
      );
    }
  }
}

export default withRouter(ActionPannel);
