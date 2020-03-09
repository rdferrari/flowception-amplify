import React from "react";
import { Link } from "react-router-dom";
import CreateSection from "./CreateSection";
import ListSection from "./ListSection";
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
          <ListSection />
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default Section;
