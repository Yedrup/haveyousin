import React from "react";
import IconService from "../../services/IconService";
import "../ListOne/listOne.css";
import {getNowPlayingMovies, getUpcomingMovies } from "../../services/tmdbService";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Card from "../Card/Card";
import { withRouter } from "react-router-dom";
import {
  createHysIdForItems,
  defineContentType
} from "../../services/listServiceHelper";
import "./calendar.css";

class Calendar extends React.Component {
  state = {
    nameList: "calendar",
    tabIndex: 0,
    tabs: [{
      tabName: "upcomingMovies",
      tabDisplayName: "Upcoming Movies",
      currentAPIPage: 0,
      datas: []
    },
    {
      tabName: "nowPlayingMovies",
      tabDisplayName: "Movies in theaters",
      currentAPIPage: 0,
      datas: []
    }
    ]
  };

  discoverMovies = async (fromChangeTab) => {
    const { tabIndex } = this.state;
    const { datas, currentAPIPage, tabName } = this.state.tabs[tabIndex];

    let datasResp;

    // Avoid triggering a call api when it's not the first run of the tab. 
    let isfromChangeTab = fromChangeTab && currentAPIPage !== 0;
    if(isfromChangeTab) return;

    let page = fromChangeTab && currentAPIPage !== 0 ? currentAPIPage : currentAPIPage + 1;


    if (tabName === "upcomingMovies") {

      datasResp = await getUpcomingMovies(page);
      if (!datasResp) return null;
      let dataUpdated = { ...this.state.tabs };
      dataUpdated[tabIndex].datas = dataUpdated[tabIndex].datas.concat(datasResp.results);
      dataUpdated[tabIndex].currentAPIPage = datasResp.page;
      this.setState(() => ({
        tabs: dataUpdated
      }));



    } else if(tabName === "nowPlayingMovies"){

      datasResp = await getNowPlayingMovies(page);
      if (!datasResp) return null;
      if (currentAPIPage > page) {console.log("will return cause this.state.tabs[tabIndex].currentAPIPage > page", this.state.tabs[tabIndex].currentAPIPage, page); return };

      let dataUpdated = { ...this.state.tabs };
      dataUpdated[tabIndex].datas = dataUpdated[tabIndex].datas.concat(datasResp.results);
      dataUpdated[tabIndex].currentAPIPage = datasResp.page;

      this.setState(prevState => ({
        tabs: dataUpdated
      }));
    } else {
      // custom filters.
    }

return;
  };

  componentDidMount() {
    let { currentAPIPage } = this.state.tabs[this.state.tabIndex];
    this.discoverMovies();
  }
  componentWillUnmount() {
    this.state = {};
  }

  render() {
    const { ActionPannel } = this.props;
    const { tabIndex } = this.state;
    const { datas, currentAPIPage } = this.state.tabs[tabIndex];
    // test if offline
    // if (this.state.datas && this.state.datas.length <= 0) {
    //   return <div>Nothing there</div>;
    // }

    const ListOfCards = props => {
      // console.log("props.datas", props.datas);
      let datas = props.datas;
      return (
        <div className="o-list__cards">
          {datas.map(function (content, index) {
            // console.log("content", content, index);
            let contentType = defineContentType(content);
            let hysId = createHysIdForItems(content.id, contentType);
            return (
              <Card
                key={content.id}
                contentId={content.id}
                hysId={hysId}
                title={content.title}
                release={content.release_date}
                overview={content.overview}
                poster={
                  content.media_type === "person"
                    ? content.profile_path
                    : content.poster_path
                }
                contentType={contentType}
                ActionPannel={ActionPannel}
              />
            );
          }
          )}
          <LoadMoreButton isContentDisplayed={datas.length ? true : false} />
        </div>

      )
    }

    const onChangingTab = (tabIndex) => {
      this.setState({ tabIndex }, () =>  this.discoverMovies(true));
    }

    const LoadMoreButton = (props) => {
      if (props.isContentDisplayed) {
      return (
        <div className="c-button-loadMore" style={{ 'backgroundColor': 'var(--color-active)', 'color': 'var(--colorOnActiveColorBg)' }} onClick={() => this.discoverMovies()}>
          <span className="c-button-loadMore__text">see more</span> <IconService nameIcon="loadMore" className="c-button-loadMore__text" iconStyleContext={{ color: "" }} />
        </div>
      )
      } else {
        return false
      }
    }


    return (
      <div>
        <header className="o-list__header o-list__title">
          <IconService nameIcon="calendar" iconStyleContext={{ color: "", margin: ".5rem" }} />
          <span className="o-list__title__text">{this.state.nameList}</span>
        </header>


        {/* <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}> */}
        <Tabs selectedIndex={tabIndex} onSelect={modiftabIndex => onChangingTab(modiftabIndex)} >
          <TabList className="c-tabs">
            <Tab selectedClassName="c-tab--selected">Upcoming Movies</Tab>
            <Tab selectedClassName="c-tab--selected" >In Theaters </Tab>
          </TabList>
          <TabPanel >
            <ListOfCards datas={datas} />
          </TabPanel>
          <TabPanel >
            <ListOfCards datas={datas} />
          </TabPanel>
        </Tabs>
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