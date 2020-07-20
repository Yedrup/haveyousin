import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HOME_ITEMS } from '../../data/navigationService';
import IconService from '../../services/IconService';

import './home.css';
class Home extends Component {
  render() {
    return (
      <div className="c-tiles--home">
        {Object.values(HOME_ITEMS).map(
          ({ title, displayName, link, image }, index) => {
            return (
              <Link key={index} to={link}>
                <div className="c-tile--home">
                  <div
                    className="c-tile--home__filter"
                    style={{
                      backgroundImage: `url(${image})`,
                    }}
                  ></div>
                  <div className="c-tile--home__inner">
                    <span className="c-item__icon--small">
                      <IconService
                        nameIcon={title}
                        iconStyleContext={{
                          color: 'var(--color-active)',
                        }}
                      />
                    </span>
                    <span className="c-tile__text">{displayName}</span>
                  </div>
                </div>
              </Link>
            );
          }
        )}
      </div>
    );
  }
}

export default Home;
