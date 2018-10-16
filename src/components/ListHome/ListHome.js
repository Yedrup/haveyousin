import React from "react";
import "./listHome.css";
import MediaQuery from "react-responsive";
import Truncate from "react-truncate";
import { Link, withRouter } from "react-router-dom";
import {getCustomLists, getOneList} from "../../services/listServiceHelper";

class ListHome extends React.Component {
  state = {
    customLists: [],
    lists: {}
  };

  componentDidMount() {
    console.log("this.props from ListHome",this.props);
    if (this.props.location.state && this.props.location.state.list && this.props.location.state.itemsInList ) {
      let customLists = getCustomLists(
        this.props.location.state.list.customListIds,
        this.props.location.state.list.byId
      );
      this.setState({
        customLists: customLists,
        lists: this.props.location.state.list
      });
    } else {
      return null;
    }
  }

  render() {
    const { customLists, lists} = this.state;
    console.log("lists in listhome",lists);
    return (
      <div>
        <h2>ListHome</h2>
        <div className="c-listHome__list">
          {Object.values(customLists).map(customList => {
            let getThisList;
            console.log('this.state.customLists',customLists)
            getThisList = getOneList(
              customLists,
              customList.id
            )
            console.log("getThisList", getThisList);
            console.log("this.props.location.state.itemsInList",this.props.location.state.itemsInList)

            return (
              <Link
                key={customList.id}
                id={customList.id}
                test="rest"
                to={{
                  pathname: "/list/" + [customList.id],
                  state: {
                    list: getThisList,
                    itemsInList: this.props.location.state.itemsInList
                  }
                }}
              >
                <div className="c-tile">
                  <MediaQuery maxWidth={767}>
                    <Truncate lines={2} ellipsis={"..."}>
                      <p className="c-tile__text">{customList.nameList}</p>
                    </Truncate>
                  </MediaQuery>
                  <MediaQuery minWidth={767}>
                    <Truncate lines={4} ellipsis={"..."}>
                      <p className="c-tile__text">{customList.nameList}</p>
                    </Truncate>
                  </MediaQuery>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}
export default withRouter(ListHome);
