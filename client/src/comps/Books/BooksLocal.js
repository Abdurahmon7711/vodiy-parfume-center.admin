import React, { useState, useEffect, useContext } from "react";
import { forwardRef } from "react";
import { useHistory } from "react-router-dom";
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
import axios from "axios";
import { StoreG } from "../../Store/Store";
import Loader from "react-loader-spinner";

const BooksLocal = () => {
  const history = useHistory();

  useEffect(() => {
    const gogo = localStorage.getItem("admin");
    if (!gogo && gogo !== "1") {
      history.push("/");
      history.go();
    }
  }, [history]);

  const state = useContext(StoreG);
  const [token] = state.token;
  const [callback, setCallback] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    if (token) {
      const getAddresses = async () => {
        const res = await axios.get("/api/address", {
          headers: { Authorization: token },
        });
        setAddresses(res.data);
        setCallback(!callback);
        setLoader(false);
      };
      getAddresses();
    }
  }, [callback, token]);

  const [columns] = useState([
    { title: "Manzil", field: "name", align: "center", width: "50%" },
    { title: "Buyurtmalar soni", align: "center", field: "amountBooks" },
    {
      title: "Buyurtmalarni ko'rish",
      field: "_id",
      align: "center",
      editable: false,
      render: (rowData) => (
        <Link to={`/Buyurtmalar/${rowData._id}`}>Manzil buyurtmalari</Link>
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
          title="Buyurtmalar"
          columns={columns}
          data={addresses}
          icons={tableIcons}
          responsive={true}
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

export default BooksLocal;
