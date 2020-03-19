import React, { useState } from "react";
import { withRouter, Link, NavLink } from "react-router-dom";
import { UserContext } from "../App";

function Header(props, { handleSignOut }) {
  const [showMenu, setShowMenu] = useState(false);

  const path = props.history.location.pathname;

  console.log(props.history);

  return (
    <UserContext.Consumer>
      {({ user }) => (
        <div>
          <div className="header-container">
            {path === "/" ? (
              <div>
                <img className="header-logo" src="/images/AppLabLogo.svg" />
              </div>
            ) : (
              <div>
                <img
                  onClick={() => props.history.goBack()}
                  className="header-back"
                  src="/images/backHeader.svg"
                />
              </div>
            )}

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
