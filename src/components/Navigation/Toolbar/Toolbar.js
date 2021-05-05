import React from "react";

import { NavLink } from "react-router-dom";
import NavIcon from "../../UI/Icons/NavIcon";

import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import NavCart from "../NavigationItems/NavCart";

const Toolbars = (props) => {
  const { cart, currentUser ,sideDrawToggle } = props;
  const isAuth = currentUser !== null;

  return (
    <>
      <header className={classes.toolbar}>
        <span className={`h2 ${classes.respond}`}>
          <NavLink to="/">ST_PACK</NavLink>
        </span>
        <div className={classes.toggle}>
          <button className="btn" onClick={sideDrawToggle}>
            <NavIcon  />
          </button>
        </div>
        <div className={classes.toggle}>
          <NavCart totalCart={cart}/>
        </div>
        <nav className={classes.respond}>
          <NavigationItems
            totalCart={cart}
            isAuth={isAuth}
            display={currentUser}
            
          />
        </nav>
      </header>
      
    </>
  );
};

export default Toolbars;
