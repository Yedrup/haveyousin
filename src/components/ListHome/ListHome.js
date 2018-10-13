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

  componentDidMount() {
    console.log(this.props.location)
    if (this.props.location.state && this.props.location.state.customLists ) {
      this.setState({
        customLists: this.props.location.state.customLists,
        lists: this.props.location.state.list
      });
    } else {
      return null;
    }
    console.log(this.state.list)

  }

  render() {
    // console.log(this.props.customLists);
    // console.log(this.props);
    const { customLists, lists } = this.state;
// console.log(customLists)
    // let customLists = this.props.customLists;
    return (
      <div>
        <h2>ListHome</h2>
        <div className="c-listHome__list">
          {customLists.map(customList => (
            <Link
              key={customList.id}
              id={customList.id}
              test="rest"
              to={{
                pathname: "/list/" + [customList.id],
                state: {
                  list : lists["List"+customList.id]
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
          ))}
        </div>
      </div>
    );
  }
}
export default withRouter(ListHome);
