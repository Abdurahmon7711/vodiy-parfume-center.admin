import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
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
import Loader from "react-loader-spinner";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { withRouter } from "react-router-dom";
import { StoreG } from "../../Store/Store";
import { toast } from "react-toastify";

const Users = (props) => {
  const match = useParams();
  const history = useHistory();

  useEffect(() => {
    const gogo = localStorage.getItem("admin");
    if (!gogo && gogo !== "1") {
      history.push("/");
      history.go();
    }
  }, [history]);

  const state = useContext(StoreG);
  const [addresses] = state.addressesAPI.addresses;
  const address = addresses.filter((item) => item._id === match.id)[0].name;

  const productInfo = {
    name: address + " foydanaluvchilari",
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
    {
      title: "Buyurtmalar miqdori",
      render: (rowData) => {
        return <p>{rowData.cart.length}</p>;
      },
    },
  ]);
  // const token = 'aksdfkaklALKJDlhfg'
  const [token] = state.token;

  const [users, setUsers] = useState([]);
  const [callback, setCallback] = useState(false);
  const [loader, setLoader] = useState(true);
  const address_id = props.match.params.id;

  useEffect(() => {
    if (token) {
      const getUsers = async () => {
        const res = await axios.get("/user/users/" + address_id, {
          headers: { Authorization: token },
        });
        setUsers(res.data);
        setLoader(false);
      };

      getUsers();
    }
  }, [callback, token, address_id]);

  const deleteUser = async (id) => {
    try {
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
      //   setLoading(true);
      const deleteProduct = axios.put(
        `/user/users/${id}`,
        { ...newData, address: address_id },
        {
          headers: { Authorization: token },
        }
      );

      await deleteProduct;
      setCallback(!callback);
      //   setLoading(false);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  const addUser = async (newData) => {
    try {
      const addProduct = axios.post("/user/register", {
        ...newData,
        address: address_id,
      });
      await addProduct;
      setCallback(!callback);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  return (
    <div>
      {/* <Route path="/Foydalanuvchilar/:id" component={UsersLocal}/> */}
      {loader ? (
        <Loader
          style={{ textAlign: "center" }}
          type="ThreeDots"
          color="#00BFFF"
          height={50}
          width={50}
          timeout={1400}
        />
      ) : (
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
          localization={{
            body: {
              editRow: {
                deleteText: "Foydalanuvchini o'chirishni tasdiqlaysizmi ?",
              },
            },
            toolbar: {
              searchPlaceholder: "qidiruv",
            },
          }}
        />
      )}
    </div>
  );
};

export default withRouter(Users);
