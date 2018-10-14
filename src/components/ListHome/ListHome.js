import React from "react";
import "./listHome.css";
import MediaQuery from "react-responsive";
import Truncate from "react-truncate";
import { Link, withRouter } from "react-router-dom";

class ListHome extends React.Component {
  state = {
    customLists: [],
    lists: {}
  };

  getOneList = (state, idToFound) => {
    let content = { ...this.props.location.state.list.byId[idToFound] };
    return content;
  };

  getCustomLists = (customListIds, allLists) => {
    console.log(" customListIds", customListIds);
    console.log(" allLists", allLists);

    const filtered = Object.keys(allLists)
      .filter(key => customListIds.includes(key))
      .reduce((obj, key) => {
        obj[key] = allLists[key];
        return obj;
      }, {});
    console.log(filtered);
    return filtered;
  };

  componentDidMount() {
    console.log(this.props);
    if (this.props.location.state && this.props.location.state.list) {
      let customLists = this.getCustomLists(
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
    let getThisList;
    const { customLists} = this.state;
    console.log(this.state.lists);
    return (
      <div>
        <h2>ListHome</h2>
        <div className="c-listHome__list">
          {Object.values(customLists).map(customList => {
            getThisList = this.getOneList(
              this.props.location.state.itemsInList,
              customList.id
            );
            console.log(getThisList);

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
