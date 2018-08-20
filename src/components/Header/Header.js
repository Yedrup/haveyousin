import React from "react";
import "./header.css";
import logo from "../../img/logo/logo-236x82.png";
import { IconContext } from "react-icons";
import { FaBars, FaSearch } from 'react-icons/fa';

const Header = (props) => (
<header className="c-header">
    <IconContext.Provider value={{ color: "var(--color-silver)"}}>
        <h3> <FaBars /> </h3>
    </IconContext.Provider>
    <h1 className="c-logo">HaveYouSin</h1>
    <IconContext.Provider value={{ color: "var(--color-silver)"}}>
        <h3> <FaSearch /> </h3>
    </IconContext.Provider>
</header>
)
  

export default Header;
