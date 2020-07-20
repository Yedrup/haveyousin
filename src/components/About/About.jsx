import React from 'react';
import IconService from '../../services/IconService';
import './about.css';

const About = (props) => (
  <div className="c-about">
    <h1 className="c-about__title logo-reference">about HaveYouSin</h1>

    <div className="c-about__presentation">
      <p>
        " <span className="logo-reference">HaveYouSin</span> that <em>serie</em>
        ? this <em>movie</em> ? "
        <p>As a sinner, the answer is "obviously I've seen it !"</p>
      </p>
      <br />
      <p>
        <span className="logo-reference">HaveYouSin</span> receives feed of
        content which are upcoming or already released in theater.
      </p>

      <ul className="c-about__items">
        <li className="c-about__item">
          <span className="c-about-item--highlight">
            <IconService
              nameIcon="toWatchList"
              iconStyleContext={{
                color: 'var(--bodyTextColor)',
              }}
            />
            Movie or serie interesting
          </span>
          in the feed? ➡️ add it directly in your To Watch List!
        </li>
        <li className="c-about__item">
          <span className="c-about-item--highlight">
            <IconService
              nameIcon="archives"
              iconStyleContext={{
                color: 'var(--bodyTextColor)',
              }}
            />
            You've seen it?
          </span>
          ➡️ mark it as check to store it in your Archives list!
        </li>
        <li className="c-about__item">
          <span className="c-about-item--highlight">
            <IconService
              nameIcon="favorites"
              iconStyleContext={{
                color: 'var(--bodyTextColor)',
              }}
            />
            It was pretty cool?
          </span>
          ➡️ add it directly in your Favorites!
        </li>
        <li className="c-about__item">
          <span className="c-about-item--highlight">
            <IconService
              nameIcon="search"
              iconStyleContext={{
                color: 'var(--bodyTextColor)',
              }}
            />
            Brad Pitt movies?
          </span>
          ➡️ search it in the search bar!
        </li>
      </ul>
    </div>

    <div className="c-about__features-to-come">
      <h2 className="c-feature-title">Features to come</h2>
      <ul className="c-features">
        <li className="c-feature">
          <span className="c-about-item--highlight">
            Custom lists creation:
          </span>
          You'll have the possibility to create a list with the name you want
          (example : christmas, halloween)
        </li>
        <li className="c-feature">
          <span className="c-about-item--highlight">
            Authentication system:
          </span>
          Currently, the data are saved on your device, next step is to have
          your lists available on all your devices (using Google firebase
          service)
        </li>
        <li className="c-feature">
          <span className="c-about-item--highlight">Preference system:</span>
          Theming the application, choice of the language, sorting your custom
          lists
        </li>
        <li className="c-feature">
          <span className="c-about-item--highlight">Stay tuned ! ;)</span>
        </li>
      </ul>
    </div>
  </div>
);

export default About;
