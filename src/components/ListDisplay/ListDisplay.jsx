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
    // console.log(data);
    if (type === "role") {
      //list of content for a person : icon content type, role, link to content
      return (
        <li className="c-list__item">
          <IconService
            nameIcon={data.media_type}
            iconStyleContext={{
              color:"var(--color-active)"
            }}
          />
          <span> {data.title ? data.title : data.name}</span>
          <span className=""> role : {data.character? data.character : "not set"}</span>
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
