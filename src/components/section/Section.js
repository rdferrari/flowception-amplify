import React from "react";
import { Link } from "react-router-dom";
import CreateSection from "./CreateSection";
import { UserContext } from "../../App";

function Section() {
  return (
    <UserContext.Consumer>
      {({ user, username }) => (
        <div>
          {console.log(username)}
          <h1>Section</h1>
          <Link to={`/section/teste`}>Teste</Link>
          {user ? <CreateSection username={username} /> : null}
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default Section;
