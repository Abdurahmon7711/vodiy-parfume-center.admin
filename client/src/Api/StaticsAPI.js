import { useState, useEffect } from "react";
import axios from "axios";

function StaticsAPI() {
  const [statics, setStatics] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getStatics = async () => {
      const res = await axios.get("/api/statics");
      setStatics(res.data);
    };

    getStatics();
  }, [callback]);
  return {
    statics: [statics, setStatics],
    callback: [callback, setCallback],
  };
}

export default StaticsAPI;
