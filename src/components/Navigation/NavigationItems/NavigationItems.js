import React from "react";
import classes from "./NavigationItems.module.css";
import CartIcon from "../../UI/Icons/CartIcon";
import UserIcon from "../../UI/Icons/UserIcon";
import { NavLink } from "react-router-dom";

const NavigationItems = (props) => {
  return (
    <>
      <ul className={classes.NavigationItems}>
        <li className={classes.hideHome}>
          <NavLink to="/" className="nav-link">
            HOME
          </NavLink>
        </li>

        <li>
          <NavLink to="/products" className="nav-link">
            PRODUCT
          </NavLink>
        </li>
      
        {props.isAuth ? (
          <>
            <li>
              <NavLink to="/logout" className="nav-link">
                <span>LOGOUT</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/account" className="nav-link">
                <UserIcon />
                <span> {props.display.email}</span>
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" className="nav-link">
              <UserIcon />
              <span> LOGIN</span>
            </NavLink>
          </li>
        )}
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

export default NavigationItems;
