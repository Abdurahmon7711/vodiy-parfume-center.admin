import React,{ useContext, useEffect} from "react";
import {StoreG} from "../Store/Store";

const NotFound = () => {
  const {setNotFound} = useContext(StoreG);
  useEffect(() => {
    setNotFound(true);
  },[])
  return (
    <div style={{textAlign:"center"}}>
      <h2>Sahifa topilmadi !!!</h2>
    </div>
  );
};

export default NotFound;
