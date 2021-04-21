import React, { useEffect, useContext } from "react";
import axios from "axios";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import Edit from "@material-ui/icons/Edit";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import AddBox from "@material-ui/icons/AddBox";
import Remove from "@material-ui/icons/Remove";
import Search from "@material-ui/icons/Search";
import SaveAlt from "@material-ui/icons/SaveAlt";
import LastPage from "@material-ui/icons/LastPage";
import FirstPage from "@material-ui/icons/FirstPage";
import ViewColumn from "@material-ui/icons/ViewColumn";
import FilterList from "@material-ui/icons/FilterList";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { withRouter } from "react-router-dom";
import { StoreG } from "../../Store/Store";
import { toast } from "react-toastify";

const Users = () => {
  const state = useContext(StoreG);

  const productInfo = {
    name: "Xaridorlar",
  };
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  const { useState } = React;

  const [columns] = useState([
    { title: "Ism", field: "name" },
    { title: "Familiya", field: "lname" },
    { title: "Login", field: "login" },
    { title: "Parol", field: "password", type: "numeric" },
    { title: "Raqam", field: "phoneNumber", type: "numeric" },
  ]);
  // const token = 'aksdfkaklALKJDlhfg'
  const [token] = state.token;

  const [users, setUsers] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get("/user/users", {
        headers: { Authorization: token },
      });
      setUsers(res.data);
      console.log(res.data);
    };

    getUsers();
  }, [callback, token]);
  console.log(users);
  // useEffect(() =>{
  //     axios.post('https://jsonplaceholder.typicode.com/posts',
  //         {malumot:data},
  //         {
  //             headers:{
  //                 'Authorization': `Basic ${token}`
  //             }
  //         }
  //     )
  //     .then(response =>console.log(response))
  //     .catch(err =>console.log(err))
  // },[data])

  const deleteUser = async (id) => {
    try {
      console.log(id);
      //   setLoading(true);
      const deleteProduct = axios.delete(`/user/users/${id}`, {
        headers: { Authorization: token },
      });

      await deleteProduct;
      setCallback(!callback);
      //   setLoading(false);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  const updateUser = async (id, newData) => {
    try {
      console.log(id);
      //   setLoading(true);
      const deleteProduct = axios.put(`/user/users/${id}`, newData, {
        headers: { Authorization: token },
      });

      await deleteProduct;
      setCallback(!callback);
      //   setLoading(false);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  const addUser = async (newData) => {
    try {
      const addProduct = axios.post("/user/register", newData);
      await addProduct;
      setCallback(!callback);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  return (
    <div>
      <MaterialTable
        title={productInfo.name}
        columns={columns}
        data={users}
        icons={tableIcons}
        options={{ exportButton: true }}
        responsive={true}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                addUser(newData);
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                updateUser(oldData._id, newData);
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                deleteUser(oldData._id);
                resolve();
              }, 1000);
            }),
        }}
      />
    </div>
  );
};

export default withRouter(Users);
