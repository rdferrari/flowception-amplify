import React from "react";
import CreateSection from "./CreateSection";
import ListSection from "./ListSection";
import { UserContext } from "../../App";

function Section() {
  return (
    <UserContext.Consumer>
      {({ user, group }) => (
        <div>
          {user && group === "admin" ? <CreateSection user={user} /> : null}
          <ListSection user={user} group={group} />
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default Section;
