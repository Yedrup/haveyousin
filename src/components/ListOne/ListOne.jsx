import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import Card from '../Card/Card';
import IconService from '../../services/IconService';
import { getThisListItems } from '../../services/listServiceHelper';
import './listOne.css';

@inject('ListsStore')
@inject('ItemsStore')
@observer
class ListOne extends Component {
  render() {
    const { ListsStore, match, ItemsStore, ActionPanel } = this.props;
    let currentList = ListsStore.lists[match.params.listId];
    const { nameIcon, nameList } = currentList;

    let itemsFromThisList = getThisListItems(
      currentList.itemsInThisList,
      ItemsStore.allItems
    );

    let isItemsInTheList = Object.values(itemsFromThisList).length;

    return (
      <article>
        <header className="o-list__header o-list__title">
          <IconService
            nameIcon={nameIcon}
            iconStyleContext={{
              color: '',
            }}
          />
          <span className="o-list__title__text">{nameList}</span>
        </header>
        <div className="o-list__cards">
          {Object.values(itemsFromThisList).map(
            ({
              hysId,
              id,
              overview,
              release,
              poster,
              title,
              contentType,
              first_air_date,
              release_date,
            }) => {
              let contentTypeDef =
                first_air_date || contentType === 'tv'
                  ? 'tv'
                  : release_date || contentType === 'movie'
                  ? 'movie'
                  : 'person';

              return (
                <Card
                  key={hysId}
                  contentId={id}
                  hysId={hysId}
                  overview={overview}
                  title={title}
                  release={release}
                  poster={poster}
                  contentType={contentTypeDef}
                  ActionPanel={ActionPanel}
                />
              );
            }
          )}
        </div>
        {!isItemsInTheList && (
          <div className="empty-lists">
            <h3 className="empty-list__title">
              Nothing yet here! Go find content :
            </h3>
            <ul className="empty-list__items">
              <li className="empty-list__item">
                <Link to="/calendar" className="list__item__link">
                  <IconService
                    nameIcon="calendar"
                    iconStyleContext={{
                      color: 'var(--color-active)',
                    }}
                  />
                  <span className="highlight">Calendar</span>
                </Link>
                to found out what are the movies released or about to be release
                to complete your lists!
              </li>
              <li className="empty-list__item">
                <IconService
                  nameIcon="search"
                  iconStyleContext={{
                    color: 'var(--color-active)',
                  }}
                />
                <span className="highlight animation-search">Search</span>
                <span className="secondary__content">
                  content too from the search bar!
                </span>
              </li>
            </ul>
          </div>
        )}
      </article>
    );
  }
}

export default withRouter(ListOne);
