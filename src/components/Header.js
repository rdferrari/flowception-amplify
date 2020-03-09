import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { UserContext } from "../App";

function Header({ handleSignOut }) {
  return (
    <UserContext.Consumer>
      {({ user }) => (
        <div>
          <p>Header</p>
          <NavLink to="/">
            <p>Home</p>
          </NavLink>
          {user ? (
            <p onClick={() => handleSignOut()}>sign out</p>
          ) : (
            <NavLink to="/login">
              <p>Login</p>
            </NavLink>
          )}
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default withRouter(Header);
