import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import IconService from '../../services/IconService';
import { MENU_ITEMS } from '../../data/navigationService';
import './menu.css';
class Menu extends Component {
  render() {
    let currentPath = this.props.location.pathname;
    return (
      <div className="c-menu">
        <NavLink exact strict to="/">
          <h1 className="c-logo c-logo--menu">HaveYouSin</h1>
        </NavLink>
        <ul className="c-menu__items">
          {Object.values(MENU_ITEMS).map(
            ({ title, displayName, link }, index) => {
              return (
                <li key={index}>
                  <NavLink
                    exact
                    strict
                    to={{
                      pathname: link,
                    }}
                    activeStyle={{
                      color: 'var(--color-active)',
                    }}
                    className={'c-menu__item__link__text c-menu__item'}
                  >
                    <IconService
                      nameIcon={title}
                      iconStyleContext={{
                        color:
                          currentPath === link
                            ? 'var(--color-active)'
                            : 'var(--iconNavColor)',
                      }}
                    />
                    <span className="c-menu__item__title">{displayName}</span>
                  </NavLink>
                </li>
              );
            }
          )}
        </ul>
        <IconService
          nameIcon="close"
          iconStyleContext={{
            className: 'c-menu__button',
            color: 'var(--button-close-color)',
          }}
        />
      </div>
    );
  }
}

export default withRouter(Menu);
