import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import Truncate from 'react-truncate';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { getCustomLists } from '../../services/listServiceHelper';
import './listHome.css';
@inject('ListsStore')
@observer
class ListHome extends Component {
  render() {
    const { defaultListIds, lists } = this.props.ListsStore;
    let customLists = getCustomLists(defaultListIds, lists);

    return (
      <div>
        <div className="c-listHome__list">
          {Object.values(customLists).map(({ id, nameList }) => {
            return (
              <Link
                key={id}
                to={{
                  pathname: '/list/' + [id],
                }}
              >
                <div className="c-tile">
                  <MediaQuery maxWidth={767}>
                    <Truncate lines={2} ellipsis={'...'}>
                      <p className="c-tile__text">{nameList}</p>
                    </Truncate>
                  </MediaQuery>
                  <MediaQuery minWidth={767}>
                    <Truncate lines={4} ellipsis={'...'}>
                      <p className="c-tile__text">{nameList}</p>
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
