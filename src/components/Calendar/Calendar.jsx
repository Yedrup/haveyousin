import React from "react";
import IconService from "../../services/IconService";
import "../ListOne/listOne.css";
import { discoverMoviesLaps } from "../../services/tmdbService";
import Card from "../Card/Card";
import { withRouter } from "react-router-dom";
import {
  createHysIdForItems,
  defineContentType
} from "../../services/listServiceHelper";

class Calendar extends React.Component {
  state = {
    datas: [],
    nameList: "calendar"
  };

  discoverMovies = async () => {
    let datas = await discoverMoviesLaps();
    if (!datas) return null;
    this.setState({
      datas: datas.results
    });
  };

  componentDidMount() {
    this.discoverMovies();
  }

  render() {
    const { ActionPannel } = this.props;
    // test if offline
    // if (this.state.datas && this.state.datas.length <= 0) {
    //   return <div>Nothing there</div>;
    // }
    return (
      <div>
        <header className="o-list__header o-list__title">
          <IconService nameIcon="calendar" iconStyleContext={{ color: "" }} />
          <span className="o-list__title__text">{this.state.nameList}</span>
        </header>
        <div className="o-list__cards">
          {this.state.datas.map(function(content, index) {
            // console.log("content", content);
            let contentType = defineContentType(content);
            let hysId = createHysIdForItems(content.id, contentType);
            return (
              <Card
                key={content.id}
                contentId={content.id}
                hysId={hysId}
                title={content.title}
                release={content.release_date}
                poster={
                  content.media_type === "person"
                    ? content.profile_path
                    : content.poster_path
                }
                contentType={contentType}
                ActionPannel={ActionPannel}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(Calendar);

// listsStore.lists = fakeState.lists.byId;
// listsStore.allIds = fakeState.lists.allIds;
// listsStore.customListIds = fakeState.lists.customListIds;
// listsStore.defaultListIds = fakeState.lists.defaultListIds;
// listsStore.numberOfLists = fakeState.lists.numberOfLists;