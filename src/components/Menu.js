import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { UserContext } from "../App";

function Menu({ handleSignOut, showMenu, setShowMenu }) {
  return (
    <UserContext.Consumer>
      {({ user }) => (
        <div>
          {showMenu === true ? (
            <div className="header-menu-body">
              <NavLink to="/">
                <p onClick={() => setShowMenu(false)}> Home</p>
              </NavLink>
              {user ? (
                <p onClick={() => handleSignOut()}>sign out</p>
              ) : (
                <NavLink to="/login">
                  <p onClick={() => setShowMenu(false)}>Login</p>
                </NavLink>
              )}
            </div>
          ) : null}
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default withRouter(Menu);
