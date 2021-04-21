import React from "react";
import { Editable } from "./Table";
import { withRouter } from "react-router-dom";
const Books = () => {

  return (
    <React.Fragment>
      <div>
        <Editable />
      </div>
    </React.Fragment>
  );
};

export default withRouter(Books);
