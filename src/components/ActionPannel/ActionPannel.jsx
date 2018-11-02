import React from "react";
import { inject, observer } from "mobx-react";
import IconService from "../../services/IconService";
import "./actionPannel.css";
import { withRouter } from "react-router-dom";

@inject("ItemsStore")
@inject("ListsStore")
@observer
class ActionPannel extends React.Component {
  openCustomPannel() {
    console.log("OPEN CUSTOMPANNEL")
  }
  render() {
   const {addItemInItemsList} = this.props.ItemsStore;
   const {addItemInThisList} = this.props.ListsStore;
    let hysId = this.props.hysId;
    let thisItem = {
      hysId : this.props.hysId,
      poster: this.props.poster,
      id: this.props.contentId,
      title : this.props.title,
      release : this.props.release,
      contentType: this.props.contentType
    }
    let listId;
    if(this.props.match.params.listId) {
      listId = this.props.match.params.listId;
    }
    const actionPannelItems = [
      {
        title: "toWatchList",
        action: () => 
        {
          addItemInItemsList(1,thisItem);
          addItemInThisList(1,hysId);
        }
      },
      {
        title: "archives",
        action: () => {
          addItemInItemsList(2,thisItem);
          addItemInThisList(2,hysId);
        }
      },
      {
        title: "favorites",
        action: () => {
          addItemInItemsList(3,thisItem);
          addItemInThisList(3,hysId);
        }
      },
      {
        title: "customLists",
        action: () => this.openCustomPannel()
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
        <span onClick={() => this.addItemInItemsList(3,hysId)}>
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
