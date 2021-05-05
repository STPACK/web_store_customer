import React from "react";
import classes from "./NavigationItems.module.css";
import CartIcon from "../../UI/Icons/CartIcon";
import { NavLink } from "react-router-dom";
const NavCart = (props) => {
  return (
    <>
      <ul className={classes.NavigationItems}>
        <li>
          <NavLink to="/carts" className="nav-link">
            <CartIcon />
            {props.totalCart ? (
              <span className="badge rounded-pill bg-light text-danger">
                {props.totalCart}
              </span>
            ) : null}
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default NavCart;
