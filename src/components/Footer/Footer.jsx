import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import IconService from '../../services/IconService';
import { FOOTER_ITEMS } from '../../data/navigationService';
import './footer.css';

class Footer extends Component {
  render() {
    let currentPath = this.props.location.pathname;
    return (
      <div className="c-footer">
        <ul className="c-footer__items">
          {Object.values(FOOTER_ITEMS).map(
            ({ title, displayName, link }, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={{
                      pathname: link,
                    }}
                    activeStyle={{
                      color: 'var(--color-active)',
                    }}
                    activeClassName="c-footer__item__link__text"
                  >
                    <span className="c-footer__item__icon">
                      <IconService
                        nameIcon={title}
                        iconStyleContext={{
                          color:
                            currentPath === link
                              ? 'var(--color-active)'
                              : 'var(--iconNavColor)',
                        }}
                      />
                    </span>
                    <span className={currentPath === link ? '' : 'hide'}>
                      {displayName}
                    </span>
                  </NavLink>
                </li>
              );
            }
          )}
        </ul>
      </div>
    );
  }
}
export default withRouter(Footer);
