// import { useState, useEffect } from "react";
// import axios from "axios";

// function PaymentsAPI(token) {
//   const [payments, setPayments] = useState([]);
//   const [callback, setCallback] = useState(false);
//   const [category, setCategory] = useState("");
//   const [number, setNumber] = useState("");
//   const [sort, setSort] = useState("");
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [result, setResult] = useState(0);

//   useEffect(() => {
//     if (token) {
//       const getPayments = async () => {
//         const res = await axios.get(
//           `/api/payment?limit=${
//             page * 9
//           }&${category}&${number}&${sort}&title[regex]=${search}`,
//           {
//             headers: { Authorization: token },
//           }
//         );
//         setPayments(res.data.payments);
//         setResult(res.data.result);
//       };
//       getPayments();
//     }
//   }, [token, callback, category, number, sort, search, page]);

//   return {
//     payments: [payments, setPayments],
//     callback: [callback, setCallback],
//     category: [category, setCategory],
//     number: [number, setNumber],
//     sort: [sort, setSort],
//     search: [search, setSearch],
//     page: [page, setPage],
//     result: [result, setResult],
//   };
// }

// export default PaymentsAPI;
