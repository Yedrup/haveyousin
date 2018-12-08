import React from "react";
import { Link } from "react-router-dom";
import "./listDisplay.css";
import IconService from "../../services/IconService";
import ImageService from "../../services/ImageService";
import { withRouter } from "react-router-dom";
import {
  createHysIdForItems,
  defineContentType
} from "../../services/listServiceHelper";

class ListDiplay extends React.Component {
  render() {
    // too much logic inside component => EVO
    let type = this.props.type;
    let data = this.props.data;
    let hysId = createHysIdForItems(data.id, data.media_type);
    // console.log(data);
    let dateContent = data.release_date
      ? data.release_date
      : data.first_air_date;
    let dateYear = new Date(dateContent).getFullYear();

    if (type === "role") {
      //list of content for a person : icon content type, role, link to content
      return (
        <li className="c-list__item">
          <span>{dateYear ? dateYear : "___"} </span>
          {/* cast.release_date? cast.release_date : "____" | date:'yyyy' */}
          <IconService
            nameIcon={data.media_type}
            iconStyleContext={{
              color: "var(--color-active)"
            }}
          />
          <Link
            className=""
            to={{
              pathname: `/details/${data.id}/${data.media_type}`,
              state: {
                contentId: data.media_type,
                hysId,
                contentType: data.media_type,
                poster: data.backdrop_path,
                release: data.release_date
                  ? data.release_date
                  : data.first_air_date,
                title: data.title
              }
            }}
          >
            {" "}
            {data.title ? data.title : data.name}
          </Link>
          <span className="">
             - {data.character ? data.character : "not set"}
          </span>
        </li>
      );
    } else {
      // cast list :
      return (
        <li className="c-cast__list__item">
         
        </li>
      );
    }
  }
}
export default withRouter(ListDiplay);
