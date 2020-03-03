import React from "react";
import { withRouter, NavLink } from "react-router-dom";

function Header() {
  return (
    <div>
      <p>Header</p>
      <NavLink to="/">
        <p>Home</p>
      </NavLink>
      <NavLink to="/login">
        <p>Login</p>
      </NavLink>
    </div>
  );
}

export default withRouter(Header);
