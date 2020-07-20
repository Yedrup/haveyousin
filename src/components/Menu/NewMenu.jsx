import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { slide as SlideMenu } from 'react-burger-menu';
import { MENU_ITEMS } from '../../data/navigationService';
import IconService from '../../services/IconService';
import './menu.css';

class NewMenu extends Component {
  state = {
    menuOpen: false,
  };

  closeMenu = () => {
    if (this.state.menuOpen) {
      this.setState({ menuOpen: false });
    }
  };

  isMenuOpen = (state) => {
    this.setState({ menuOpen: state.isOpen });
  };

  render() {
    let currentPath = this.props.location.pathname;

    return (
      <SlideMenu
        role="navigation"
        isOpen={this.state.menuOpen}
        onStateChange={this.isMenuOpen}
      >
        <NavLink exact strict to="/" onClick={this.closeMenu}>
          <h1 className="c-logo c-logo--menu"> HaveYouSin </h1>
        </NavLink>
        <ul className="c-menu__items">
          {Object.values(MENU_ITEMS).map(({ title, link }, index) => {
            return (
              <li key={index}>
                <NavLink
                  exact
                  strict
                  onClick={this.closeMenu}
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
                  <span className="c-menu__item__title">{title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </SlideMenu>
    );
  }
}

export default withRouter(NewMenu);
