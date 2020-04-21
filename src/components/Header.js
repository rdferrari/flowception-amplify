import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { UserContext } from "../App";

function Header({ history, handleSignOut }) {
  const path = history.location.pathname;

  return (
    <UserContext.Consumer>
      {({ user }) => (
        <div>
          <div className="header-container">
            <div className="header-signin-container">
              <div>
                {user ? (
                  <img
                    onClick={() => handleSignOut()}
                    className="header-signing"
                    src="/images/signout.svg"
                    alt="Signout"
                  />
                ) : path !== "/login" ? (
                  <NavLink to="/login">
                    <img
                      className="header-signing"
                      src="/images/signin.svg"
                      alt="Signin"
                    />
                  </NavLink>
                ) : (
                  <NavLink to="/">
                    <img
                      className="header-signing"
                      src="/images/close.svg"
                      alt="Go back"
                    />
                  </NavLink>
                )}
              </div>
            </div>

            <div>
              {path === "/" ? (
                <div>
                  <p className="header-title">
                    CONTENT BY RODRIGO FERRARI, PHD.
                  </p>
                </div>
              ) : (
                <div>
                  {path !== "/login" && (
                    <p
                      onClick={() => history.goBack()}
                      className="header-title-back"
                    >
                      <span>
                        <img
                          className="header-title-back-icon"
                          src="/images/backHeader.svg"
                          alt="Go back to home"
                        />
                      </span>
                      WHAT WE CAN DESCRIBE IS IMPERMANENT
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default withRouter(Header);
