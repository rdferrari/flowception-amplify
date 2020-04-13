import React, { useState } from "react";
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
              {user ? (
                <img
                  onClick={() => handleSignOut()}
                  className="header-signing"
                  src="/images/signout.svg"
                />
              ) : (
                <NavLink to="/login">
                  <img className="header-signing" src="/images/signin.svg" />
                </NavLink>
              )}
            </div>

            {path === "/" ? (
              <div>
                <p className="header-title">CONTENT BY RODRIGO FERRARI, PHD.</p>
              </div>
            ) : (
              <div>
                <p
                  onClick={() => history.goBack()}
                  className="header-title-back"
                >
                  <span>
                    <img
                      className="header-title-back-icon"
                      src="/images/backHeader.svg"
                    />
                  </span>
                  WHAT WE CAN DESCRIBE IS IMPERMANENT
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default withRouter(Header);
