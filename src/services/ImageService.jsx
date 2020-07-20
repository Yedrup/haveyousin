import React, { Component } from 'react';
import ImageDefault45 from '../img/default/defaultImage45.png';
import ImageDefault185 from '../img/default/defaultImage185.png';
import ImageDefault92 from '../img/default/defaultImage92.png';
import '../css/Images.css';

class ImageService extends Component {
  addDefaultImage = (event) => {
    const { target } = event;
    const { size } = this.props;

    if (size === '45') target.src = ImageDefault45;
    else if (size === '92') target.src = ImageDefault92;
    else if (size === '185') target.src = ImageDefault185;
  };
  render() {
    const { size, imageTitle, photoPath } = this.props;
    return (
      <div className={'c-image-background c-image-background--' + size}>
        <img
          className="c-image"
          onError={this.addDefaultImage}
          alt={imageTitle}
          src={'https://image.tmdb.org/t/p/w' + size + photoPath}
        />
      </div>
    );
  }
}

export default ImageService;
