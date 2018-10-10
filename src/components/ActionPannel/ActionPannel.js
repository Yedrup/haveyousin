import React from "react";
import IconService from "../../services/IconService";
import "./actionPannel.css";
import { withRouter } from "react-router-dom";

class ActionPannel extends React.Component {
  render() {
    // console.log(this.props);
    let TestFav = {
      poster_path: "tatapoutoutou",
      overview:
        "From DC Comics comes the Suicide Squad, an antihero team of incarcerated supervillains who act as deniable assets for the United States government, undertaking high-risk black ops missions in exchange for commuted prison sentences.",
      release_date: "2016-08-03",
      genre_ids: [14, 28, 80],
      id: 297761,
      original_title: "Suicide Squad",
      original_language: "en",
      title: "Suicide Squad",
      backdrop_path: "/ndlQ2Cuc3cjTL7lTynw6I4boP4S.jpg",
      popularity: 48.261451,
      vote_count: 1466,
      video: false,
      vote_average: 5.91
    };

    let contentId = this.props.contentId;
    let listId;
    if(this.props.match.params.listId) {
      listId = `List-${this.props.match.params.listId}`;
    }
    const actionPannelItems = [
      {
        title: "toWatchList",
        action: () => this.props.addToList(contentId,listId = "List-1")
      },
      {
        title: "archives",
        action: () => this.props.addToList(contentId,listId = "List-2")
      },
      {
        title: "favorites",
        action: () => this.props.addToList(contentId,listId = "List-3")
      },
      {
        title: "customLists",
        action: () => this.props.addToList(contentId,listId = "custom")
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
        <span onClick={() => this.addToFavorite(contentId)}>
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
