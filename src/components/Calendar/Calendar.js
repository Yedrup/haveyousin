import React from "react";
import IconService from "../../services/IconService";
import '../ListOne/listOne.css';
import { discoverMoviesLaps } from "../../services/tmdbService";

class Calendar extends React.Component {

  discoverMovies= async() => {
    let datas = await discoverMoviesLaps();
    console.log("datas :" , datas);
  }

  componentDidMount() {
    this.discoverMovies();
  }
  render() {
    return (
      <div>
         <header className="o-list__header o-list__title">
         <IconService nameIcon="calendar" iconStyleContext={{color:""}}/>
        <span className="o-list__title__text">{this.props.list.nameList}</span>
        </header>
      </div>
    );
  }
}

export default Calendar;
