import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import IconService from '../../services/IconService';
import {
  getNowPlayingMovies,
  getUpcomingMovies,
} from '../../services/tmdbService';
import Card from '../Card/Card';
import {
  createHysIdForItems,
  defineContentType,
} from '../../services/listServiceHelper';
import './calendar.css';
import '../ListOne/listOne.css';

class Calendar extends Component {
  state = {
    nameList: 'Calendar',
    tabIndex: 0,
    tabs: [
      {
        tabName: 'upcomingMovies',
        tabDisplayName: 'Upcoming Movies',
        currentAPIPage: 0,
        data: [],
        isMaxPageReached: false,
      },
      {
        tabName: 'nowPlayingMovies',
        tabDisplayName: 'Movies in theaters',
        currentAPIPage: 0,
        data: [],
        isMaxPageReached: false,
      },
    ],
  };

  isMaxPageReached = (currentAPIPage, maxAPIPage) => {
    return currentAPIPage === maxAPIPage || maxAPIPage < currentAPIPage;
  };

  discoverMovies = async (fromChangeTab) => {
    const { tabIndex } = this.state;
    const currentTabObj = this.state.tabs[tabIndex];
    const { currentAPIPage, tabName, isMaxPageReached } = currentTabObj;

    if (isMaxPageReached) return;
    // Avoid triggering a call api when it's not the first run of the tab.
    let isFromChangeTab = fromChangeTab && currentAPIPage !== 0;
    if (isFromChangeTab) return;

    let dataResp;
    let dataUpdated = { ...this.state.tabs };
    let page =
      fromChangeTab && currentAPIPage !== 0
        ? currentAPIPage
        : currentAPIPage + 1;

    if (tabName === 'upcomingMovies') {
      dataResp = await getUpcomingMovies(page);
      if (!dataResp) return null;
    } else {
      dataResp = await getNowPlayingMovies(page);
      if (!dataResp) return null;
    }

    dataUpdated[tabIndex].data = dataUpdated[tabIndex].data.concat(
      dataResp.results
    );
    dataUpdated[tabIndex].currentAPIPage = dataResp.page;
    let updateIsMaxPageReached = this.isMaxPageReached(
      dataResp.page,
      dataResp.total_pages
    );

    if (updateIsMaxPageReached) {
      dataUpdated[tabIndex].isMaxPageReached = true;
    }

    this.setState((prevState) => ({
      tabs: dataUpdated,
    }));
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
    const { ActionPanel } = this.props;
    const { tabIndex } = this.state;
    const { data, isMaxPageReached } = this.state.tabs[tabIndex];

    const ListOfCards = (props) => {
      let { data } = props;
      return (
        <div>
          <div className="o-list__cards">
            {data.map(function (content, index) {
              let contentType = defineContentType(content);
              const {
                id,
                title,
                release_date,
                overview,
                media_type,
                profile_path,
                poster_path,
              } = content;

              let hysId = createHysIdForItems(id, contentType);
              return (
                <Card
                  key={id}
                  contentId={id}
                  hysId={hysId}
                  title={title}
                  release={release_date}
                  overview={overview}
                  poster={media_type === 'person' ? profile_path : poster_path}
                  contentType={contentType}
                  ActionPanel={ActionPanel}
                />
              );
            })}
          </div>
          {!isMaxPageReached && (
            <LoadMoreButton isContentDisplayed={data.length} />
          )}
        </div>
      );
    };

    const onChangingTab = (tabIndex) => {
      this.setState({ tabIndex }, () => this.discoverMovies(true));
    };

    const LoadMoreButton = ({ isContentDisplayed }) => {
      if (isContentDisplayed) {
        return (
          <div
            className="c-button-loadMore"
            style={{
              backgroundColor: 'var(--color-active)',
              color: 'var(--colorOnActiveColorBg)',
            }}
            onClick={() => this.discoverMovies()}
          >
            <span className="c-button-loadMore__text">see more</span>
            <IconService
              nameIcon="loadMore"
              className="c-button-loadMore__text"
              iconStyleContext={{ color: '' }}
            />
          </div>
        );
      } else {
        return false;
      }
    };

    return (
      <div>
        <header className="o-list__header o-list__title">
          <IconService
            nameIcon="calendar"
            iconStyleContext={{ color: '', margin: '.5rem' }}
          />
          <span className="o-list__title__text">{this.state.nameList}</span>
        </header>

        <Tabs
          selectedIndex={tabIndex}
          onSelect={(modifTabIndex) => onChangingTab(modifTabIndex)}
        >
          <TabList className="c-tabs">
            <Tab className="c-tab" selectedClassName="c-tab--selected">
              Upcoming Movies
            </Tab>
            <Tab className="c-tab" selectedClassName="c-tab--selected">
              In Theaters
            </Tab>
          </TabList>
          <TabPanel>
            <ListOfCards data={data} isMaxPageReached={isMaxPageReached} />
          </TabPanel>
          <TabPanel>
            <ListOfCards data={data} isMaxPageReached={isMaxPageReached} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default withRouter(Calendar);
