import React from "react";
import CreateSection from "./CreateSection";
import ListSection from "./ListSection";
import { UserContext } from "../../App";

function Section() {
  return (
    <UserContext.Consumer>
      {({ user, username, group }) => (
        <div>
          {console.log(username)}
          {group === "admin" ? (
            <CreateSection user={user} username={username} />
          ) : null}
          <ListSection user={user} username={username} />
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default Section;
