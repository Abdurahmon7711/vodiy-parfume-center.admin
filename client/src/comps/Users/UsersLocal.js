import React, { useContext, useEffect, useState } from "react";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import Edit from "@material-ui/icons/Edit";
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import AddBox from "@material-ui/icons/AddBox";
import Search from "@material-ui/icons/Search";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import LastPage from "@material-ui/icons/LastPage";
import FirstPage from "@material-ui/icons/FirstPage";
import FilterList from "@material-ui/icons/FilterList";
import ViewColumn from "@material-ui/icons/ViewColumn";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { StoreG } from "../../Store/Store";
import Loader from "react-loader-spinner";

const UsersLocal = () => {
  const state = useContext(StoreG);
  const [token] = state.token;
  const [callback, setCallback] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [loader, setLoader] = useState(true);

  const [columns] = useState([
    { title: "Manzil", field: "name", align: "center", width: "30%" },
    {
      title: "Foydalanuvchilarni ko'rish",
      field: "_id",
      align: "center",
      editable: false,
      render: (rowData) => (
        <Link to={`/Foydalanuvchilar/${rowData._id}`}>
          Manzil foydalanuvchilari
        </Link>
      ),
    },
  ]);

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

  useEffect(() => {
    if (token) {
      const getAddresses = async () => {
        const res = await axios.get("/api/address", {
          headers: { Authorization: token },
        });
        setAddresses(res.data);
        setLoader(false);
      };

      getAddresses();
    }
  }, [callback, token]);

  const deleteAddress = (id) => {
    try {
      //   setLoading(true);
      axios
        .delete(`/api/address/${id}`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          toast.success(res.data.msg, { autoClose: 1500 });
          setCallback(!callback);
        });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  const updateAddress = (id, newData) => {
    try {
      //   setLoading(true);
      axios
        .put(`/api/address/${id}`, newData, {
          headers: { Authorization: token },
        })
        .then((res) => {
          toast.success(res.data.msg, { autoClose: 1500 });
          setCallback(!callback);
        });

      //   setLoading(false);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  const addAddress = (newData) => {
    try {
      axios
        .post("/api/address", newData, {
          headers: { Authorization: token },
        })
        .then((res) => {
          toast.success(res.data.msg, { autoClose: 1500 });
          setCallback(!callback);
        });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  return (
    <div>
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
          title="Foydalanuvchilar"
          columns={columns}
          data={addresses}
          icons={tableIcons}
          responsive={true}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  deleteAddress(oldData._id);
                  resolve();
                }, 1000);
              }),

            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  addAddress(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  updateAddress(oldData._id, newData);
                  resolve();
                }, 1000);
              }),
          }}
          localization={{
            toolbar: {
              searchPlaceholder: "qidiruv",
            },
            body: {
              editRow: {
                deleteText: "Ma'lumotni o'chirishni tasdiqlaysizmi ?",
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default UsersLocal;
