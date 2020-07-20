import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import IconService from '../../services/IconService';
import './actionPanel.css';

@inject('ItemsStore')
@inject('ListsStore')
@observer
class ActionPanel extends Component {
  openCustomPanel() {
    console.log('OPEN CUSTOM PANEL');
  }
  render() {
    const { addItemInItemsList, allItems } = this.props.ItemsStore;
    const { addItemInThisList } = this.props.ListsStore;
    const {
      hysId,
      poster,
      contentId,
      overview,
      title,
      release,
      contentType,
    } = this.props;

    let thisItemActions;
    let itemAsHys = allItems[hysId];

    if (itemAsHys) {
      thisItemActions = itemAsHys.itemStatusByList;
    } else {
      thisItemActions = {
        '1': null,
        '2': null,
        '3': null,
        '4': null,
      };
    }

    let thisItem = {
      hysId,
      poster,
      id: contentId,
      overview,
      title,
      release,
      contentType,
    };

    const actionPanelItems = [
      {
        title: 'toWatchList',
        displayName: 'To Watch List',
        isInThisList: thisItemActions['1'],
        action: () => {
          addItemInItemsList('1', thisItem);
          addItemInThisList('1', hysId);
        },
      },
      {
        title: 'archives',
        displayName: 'Archives',
        isInThisList: thisItemActions['2'],
        action: () => {
          addItemInItemsList('2', thisItem);
          addItemInThisList('2', hysId);
        },
      },
      {
        title: 'favorites',
        displayName: 'Favorites',
        isInThisList: thisItemActions['3'],
        action: () => {
          addItemInItemsList('3', thisItem);
          addItemInThisList('3', hysId);
        },
      },
      // ,
      // {
      //   title: "customLists",
      //   displayName: "Custom Lists",
      //   isInThisList : thisItemActions["4"],
      //   action: () => {
      //     this.openCustomPanel()
      //   }
      // }
    ];
    if (contentType !== 'person') {
      return (
        <ul className="c-actionPanel">
          {actionPanelItems.map((panelItem, index) => {
            const { title, isInThisList, action } = panelItem;
            return (
              <li key={index} onClick={action}>
                <IconService
                  nameIcon={title}
                  iconStyleContext={{
                    color: isInThisList ? 'var(--color-active)' : '',
                  }}
                />
              </li>
            );
          })}
        </ul>
      );
    } else {
      return (
        <span onClick={() => addItemInThisList('3', hysId)}>
          <IconService
            nameIcon={'favorites'}
            iconStyleContext={{
              color: '',
            }}
          />
        </span>
      );
    }
  }
}

export default withRouter(ActionPanel);
