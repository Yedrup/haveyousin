import React from "react";
import "./listHome.css";
import MediaQuery from "react-responsive";
import Truncate from "react-truncate";
import { Link, withRouter } from "react-router-dom";

class ListHome extends React.Component {
  render() {
    console.log(this.props.customLists);
    console.log(this.props);

    let customLists = this.props.customLists;
    return (
      <div>
        <h2>ListHome</h2>
        <div className="c-listHome__list">
          {Object.keys(customLists).map(key => (
             <Link key={key} id={key} test="rest"
             to={{
               pathname: "/list/"+[key],
               state: {
                 list: customLists[key]
                }
             }}
           >
            <div  className="c-tile">
              <MediaQuery maxWidth={767}>
                <Truncate lines={2} ellipsis={"..."}>
                  <p className="c-tile__text">{customLists[key].nameList}</p>
                </Truncate>
              </MediaQuery>
              <MediaQuery minWidth={767}>
                <Truncate lines={4} ellipsis={"..."}>
                  <p className="c-tile__text">{customLists[key].nameList}</p>
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
