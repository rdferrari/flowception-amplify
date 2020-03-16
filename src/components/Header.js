import React, { useState } from "react";
import { withRouter, Link, NavLink } from "react-router-dom";
import { UserContext } from "../App";

// import Menu from "./Menu";

function Header({ handleSignOut }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <UserContext.Consumer>
      {({ user }) => (
        <div>
          <div className="header-container">
            <div>
              <img className="header-logo" src="/images/AppLabLogo.svg" />
            </div>
            <div>
              <p className="header-title">AppLab</p>
            </div>
            <div>
              {showMenu === false ? (
                <img
                  onClick={() => setShowMenu(true)}
                  className="header-menu"
                  src="/images/HamburgerMenu.svg"
                />
              ) : (
                <div>
                  <img
                    onClick={() => setShowMenu(false)}
                    className="header-menu"
                    src="/images/CloseMenu.svg"
                  />
                </div>
              )}
            </div>
          </div>

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
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default withRouter(Header);
