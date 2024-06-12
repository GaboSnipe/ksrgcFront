import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Header.css";
import { useDispatch, useSelector } from "react-redux";


const Header = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
  <div
    className="navbar-bottom-menu border-y border-gray-800 bg-base-200"
    style={{ height: "10vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
  >
    <div className="container text-2xl navlinks-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <NavLink className="text-accent-content" to="/">
        რაღაც
      </NavLink>
      <NavLink className="text-accent-content" to="/">
        რაღაც
      </NavLink>
      <NavLink className="text-accent-content" to="/">
        რაღაც
      </NavLink>
      <NavLink className="text-accent-content" to="/">
        რაღაც
      </NavLink>
      <NavLink className="text-accent-content" to="/">
        რაღაც
      </NavLink>
      <NavLink className="text-accent-content" to="/">
        რაღაც
      </NavLink>
      <NavLink className="text-accent-content" to="/">
        რაღაც
      </NavLink>
      <NavLink className="text-accent-content" to="/">
        რაღაც
      </NavLink>
    </div>
  </div>
</>
  );
};

export default Header;