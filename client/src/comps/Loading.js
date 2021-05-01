import React from "react";
import Loader from "react-loader-spinner";

const Loading = () => {
  return (
    <Loader
      style={{ textAlign: "center" }}
      type="ThreeDots"
      color="#00BFFF"
      height={50}
      width={50}
      timeout={500} //3 secs
    />
  );
};

export default Loading;
