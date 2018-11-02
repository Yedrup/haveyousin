import React from "react";
import "../css/Images.css";
import ImageDefault45 from "../img/default/defaultImage45.png";
import ImageDefault185 from "../img/default/defaultImage185.png";
import ImageDefault92 from "../img/default/defaultImage92.png";

class ImageService extends React.Component {
    addDefaultImage = (event) => {
        if(this.props.size === "45") event.target.src = ImageDefault45
        else if(this.props.size === "92")event.target.src = ImageDefault92
        else if(this.props.size === "185")event.target.src = ImageDefault185
    }
  render() {
    console.log(this.props.photoPath)
    return (
        <div className={"c-image-background c-image-background--"+this.props.size}>
         <img className="c-image"
          onError={this.addDefaultImage}
          alt={this.props.imageTitle}
          src={
            "https://image.tmdb.org/t/p/w" +this.props.size +
            this.props.photoPath
          }
        />
      </div>
    );
  }
}

export default ImageService;
