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
    const {addItemInItemsList, setItemPannelActionByList,itemsPannelAction} = this.props.ItemsStore;
    const {addItemInThisList} = this.props.ListsStore;
    let hysId = this.props.hysId;
  const getItemAction = item => {
    return item.hysId === hysId;
  }
  let thisItemActions = itemsPannelAction.find(getItemAction);
  let thisItemActionsObj;
  if(thisItemActions) {
    console.log("thisItemActions",thisItemActions.pannelActionByList);
    thisItemActionsObj = thisItemActions.pannelActionByList;
    console.log("thisItemActionsObj",thisItemActionsObj)
  }
    let thisItem = {
      hysId : this.props.hysId,
      poster: this.props.poster,
      id: this.props.contentId,
      title : this.props.title,
      release : this.props.release,
      contentType: this.props.contentType
    }
    const actionPannelItems = [
      {
        title: "toWatchList",
        isInThisList : thisItemActions? thisItemActionsObj["1"]:null,
        action: () => 
        {
          addItemInItemsList("1",thisItem);
          setItemPannelActionByList("1",hysId);
          addItemInThisList("1",hysId);
        }
      },
      {
        title: "archives",
        isInThisList : thisItemActions? thisItemActionsObj["2"]:null,
        action: () => {
          addItemInItemsList("2",thisItem);
          setItemPannelActionByList("2",hysId);
          addItemInThisList("2",hysId);
        }
      },
      {
        title: "favorites",
        isInThisList : thisItemActions? thisItemActionsObj["3"]:null,
        action: () => {
          addItemInItemsList("3",thisItem);
          setItemPannelActionByList("3",hysId);
          addItemInThisList("3",hysId);
        }
      },
      {
        title: "customLists",
        isInThisList : thisItemActions? thisItemActionsObj["4"]:null,
        action: () => {
          setItemPannelActionByList("4",hysId);
          this.openCustomPannel()
        }
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
