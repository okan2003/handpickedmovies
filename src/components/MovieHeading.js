import React from "react";

const MovieHeading = (props) => {
  return (
    <div className="col">
      {/* De heading die als een prop wordt doorgegeven aan het component. */}
      <h1>{props.heading}</h1>
    </div>
  );
};

export default MovieHeading;
