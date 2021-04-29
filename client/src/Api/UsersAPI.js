// import { useState, useEffect } from "react";
// import axios from "axios";

// function UsersAPI(token) {
//   const [users, setUsers] = useState([]);
//   const [callback, setCallback] = useState(false);

//   useEffect(() => {
//     if (token) {
//       const getUsers = async () => {
//         const res = await axios.get("/user/users");
//         setUsers(res.data);
//       };
//       getUsers();
//     }
//   }, [callback, token]);
//   return {
//     users: [users, setUsers],
//     callback: [callback, setCallback],
//   };
// }

// export default UsersAPI;
