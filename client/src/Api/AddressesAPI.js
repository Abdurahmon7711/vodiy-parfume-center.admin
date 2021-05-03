import { useState, useEffect } from "react";
import axios from "axios";

function AddressesAPI(token) {
  const [addresses, setAddresses] = useState([]);
  const [callback, setCallback] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    const getAddresses = async () => {
      const res = await axios.get("/api/address", {
        headers: { Authorization: token },
      });
      setAddresses(res.data);
      setLoader(false);
    };

    getAddresses();
  }, [callback, token]);
  return {
    loader: [loader, setLoader],
    addresses: [addresses, setAddresses],
    callback: [callback, setCallback],
  };
}

export default AddressesAPI;
