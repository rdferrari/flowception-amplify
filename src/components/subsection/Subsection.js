import React from "react";
import { useParams } from "react-router-dom";

function Subsection() {
  let { id } = useParams();
  return (
    <div>
      <h1>Subsection {id}</h1>
    </div>
  );
}

export default Subsection;
