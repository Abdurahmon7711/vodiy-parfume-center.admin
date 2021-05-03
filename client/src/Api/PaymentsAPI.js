import { useState, useEffect } from "react";
import axios from "axios";

function PaymentsAPI(token) {
  const [payments, setPayments] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    if (token) {
      const getPayments = async () => {
        const res = await axios.get(`/api/paymentFalse`, {
          headers: { Authorization: token },
        });
        setPayments(res.data);
      };
      getPayments();
    }
  }, [token, callback]);

  return {
    payments: [payments, setPayments],
    callback: [callback, setCallback],
  };
}

export default PaymentsAPI;
