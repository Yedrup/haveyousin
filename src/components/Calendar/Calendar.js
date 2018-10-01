import React from "react";
import IconService from "../../services/IconService";
import '../ListOne/listOne.css';
import { discoverMoviesLaps } from "../../services/tmdbService";
import Card from "../Card/Card";
import { withRouter } from "react-router-dom";

class Calendar extends React.Component {

  state = {
    today : new Date(),
    datas : []
  }


  discoverMovies= async() => {
    let datas = await discoverMoviesLaps();
    console.log("datas :" , datas);
    this.setState({
      datas: datas.results
    });
  }

  componentDidMount() {
    this.discoverMovies();
  }
  render() {
    let ActionPannel = this.props.ActionPannel;
    let results = this.state.datas;
    console.log(results)
    return (
      <div>
         <header className="o-list__header o-list__title">
         <IconService nameIcon="calendar" iconStyleContext={{color:""}}/>
        <span className="o-list__title__text">{this.props.list.nameList}</span>
        </header>
        <div className="o-list__cards">
          {results.map(function(content, index) {
            console.log("content",content);
            //TODO : recreate service for list regarding type :/
            let contentType;
            if(content.first_air_date) contentType = 'tv'
            else if(content.release_date) contentType = 'movie'
            else contentType = 'person'

            return (
              <Card
                key={content.id}
                contentId={content.id}
                title={content.title}
                release={content.release_date}
                poster={content.media_type === "person" ? content.profile_path  : content.poster_path}
                contentType={contentType}
                ActionPannel={ActionPannel}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(Calendar);
