import React from "react";
import "./about.css";
import IconService from "../../services/IconService";


const About = (props) => (
    <div className="c-about">
        <h1 className="c-about__title logo-reference">about HaveYouSin</h1>

        <div className="c-about__presentation">
            <p>"<span className="logo-reference">HaveYouSin</span> that <em>serie</em>? this <em>movie</em>?"</p>
            <p>As a sinner, the answer is "obviously I've seen it!!"</p>
            <p><span className="logo-reference">HaveYouSin</span>  receive feed of content which are in upcoming, in theater or new tvshow</p>


            <ul className="c-about__items">
                <li className="c-about__item">
                    <span className="c-about-item--hilight">
                        <IconService
                            nameIcon='toWatchList'
                            iconStyleContext={{
                                color: "var(--bodyTextColor)"
                            }}
                        />
                        Movie or serie interesting
                </span>in the feed? => add it directly in your to watchlist!
            </li>
                <li className="c-about__item">
                    <span className="c-about-item--hilight">
                        <IconService
                            nameIcon='archives'
                            iconStyleContext={{
                                color: "var(--bodyTextColor)"
                            }}
                        />
                        You've seen it?
                </span>
                    => mark it as check to store it in your archive list!
            </li>
                <li className="c-about__item">
                    <span className="c-about-item--hilight">
                        <IconService
                            nameIcon='favorites'
                            iconStyleContext={{
                                color: "var(--bodyTextColor)"
                            }}
                        />
                        It was pretty cool?
                </span>
                    => add it directly in your favorites!
            </li>
                <li className="c-about__item">
                    <span className="c-about-item--hilight">
                        <IconService
                            nameIcon='search'
                            iconStyleContext={{
                                color: "var(--bodyTextColor)"
                            }}
                        />
                        Brad Pitt movies? </span> => search it!
            </li>
            </ul>
        </div>

        <div className="c-about__features-to-come">
            <h2 className="c-feature-title">Features to come</h2>
            <ul className="c-features">
                <li className="c-feature"><span className="c-about-item--hilight">Custom lists creation:</span>you'll have the possibility to create a list with the name you want (example : christmas, halloween)</li>
                <li className="c-feature"><span className="c-about-item--hilight">Authentication system:</span>currently, the data are saved on your device, next step is to have your lists available on all your devices (using Google firebase service)</li>
                <li className="c-feature"><span className="c-about-item--hilight">Preference system:</span>theming the application, choice of the language, sorting your custom lists</li>
                <li className="c-feature"><span className="c-about-item--hilight">Stay tuned ! ;)</span></li>
            </ul>
        </div>


    </div>
)


export default About;
