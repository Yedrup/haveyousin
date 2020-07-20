import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import IconService from '../../services/IconService';
import { createHysIdForItems } from '../../services/listServiceHelper';
import './listDisplay.css';

class ListDisplay extends React.Component {
  render() {
    // too much logic inside component => EVO
    const { type, data } = this.props;
    const {
      release_date,
      first_air_date,
      media_type,
      id,
      backdrop_path,
      name,
      character,
      title,
    } = data;

    let hysId = createHysIdForItems(id, media_type);
    let dateContent = release_date ? release_date : first_air_date;
    let dateYear = new Date(dateContent).getFullYear();

    if (type === 'role') {
      //list of content for a person : icon content type, role, link to content
      return (
        <li className="c-list__item">
          <span>{dateYear ? dateYear : '___'} </span>
          {/* cast.release_date? cast.release_date : "____" | date:'yyyy' */}
          <IconService
            nameIcon={media_type}
            iconStyleContext={{
              color: 'var(--color-active)',
            }}
          />
          <Link
            className=""
            to={{
              pathname: `/details/${id}/${media_type}`,
              state: {
                contentId: media_type,
                hysId,
                contentType: media_type,
                poster: backdrop_path,
                release: release_date ? release_date : first_air_date,
                title,
              },
            }}
          >
            {title ? title : name}
          </Link>
          <span className="">- {character ? character : 'not set'}</span>
        </li>
      );
    } else {
      // cast list :
      return <li className="c-cast__list__item"></li>;
    }
  }
}
export default withRouter(ListDisplay);
