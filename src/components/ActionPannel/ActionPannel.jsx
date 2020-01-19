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
    const {addItemInItemsList, allItems} = this.props.ItemsStore;
    const {addItemInThisList} = this.props.ListsStore;
    let hysId = this.props.hysId;
    let thisItemActions;
    let itemAsHys = allItems[hysId];
    if(itemAsHys) {
      thisItemActions =  itemAsHys.itemStatusByList;
    } else {
      thisItemActions = {
          "1": null,
          "2": null,
          "3": null,
          "4": null
      } 
    }
    let thisItem = {
      hysId : this.props.hysId,
      poster: this.props.poster,
      id: this.props.contentId,
      overview : this.props.overview,
      title : this.props.title,
      release : this.props.release,
      contentType: this.props.contentType
    }
    const actionPannelItems = [
      {
        title: "toWatchList",
        isInThisList : thisItemActions["1"],
        action: () => 
        {
          addItemInItemsList("1",thisItem);
          addItemInThisList("1",hysId);
        }
      },
      {
        title: "archives",
        isInThisList : thisItemActions["2"],
        action: () => {
          addItemInItemsList("2",thisItem);
          addItemInThisList("2",hysId);
        }
      },
      {
        title: "favorites",
        isInThisList : thisItemActions["3"],
        action: () => {
          addItemInItemsList("3",thisItem);
          addItemInThisList("3",hysId);
        }
      }
      // ,
      // {
      //   title: "customLists",
      //   isInThisList : thisItemActions["4"],
      //   action: () => {
      //     this.openCustomPannel()
      //   }
      // }
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
                    color: pannelItem.isInThisList ? "var(--color-active)" : ""
                  }}
                />
              </li>
            );
          })}
        </ul>
      );
    } else {
      return (
        <span onClick={() => addItemInThisList("3",hysId)}>
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
