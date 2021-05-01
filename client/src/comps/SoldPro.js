import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Button from "@material-ui/core/Button";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Loader from "react-loader-spinner";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { StoreG } from "../Store/Store";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { toast } from "react-toastify";
import { Dialog, DialogActions, DialogTitle } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    height: "90vh",
    overflowY: "scroll",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const newDate = (a) => {
  return a.split("T")[0];
};

function SoldPro() {
  const historyUrl = useHistory();
  useEffect(() => {
    const gogo = localStorage.getItem("admin");
    if (!gogo && gogo !== "1") {
      historyUrl.push("/");
      historyUrl.go();
    }
  }, [historyUrl]);

  const state = useContext(StoreG);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [history, setHistory] = useState([]);
  const [rowData, setRowData] = useState({});
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [openDel, setOpenDel] = React.useState(false);
  const [loaderUp, setLoaderUp] = useState(true);
  const [callback, setCallback] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get("/api/payment/true", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
          setLoaderUp(false);
        }
      };
      getHistory();
    }
  }, [callback, token, isAdmin, setHistory]);

  // useEffect(() => {
  //   history ? setLoaderUp(false) : setLoaderUp(true);
  // }, [history]);
  // const payments = state.paymentsAPI.payments;

  const handleOpen = (data) => {
    setOpen(true);
    setRowData(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const totalSum = (data) => {
    let s = 0;
    data.cart.map((item) => (s += item.quantity * item.price));
    return s;
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {Object.keys(rowData).length !== 0 ? (
        <React.Fragment>
          <h3>Ismi: {rowData.name}</h3>
          <h3>Tel raqami: {rowData.phoneNumber}</h3>
          <h3>Sana: {newDate(rowData.createdAt)}</h3>
          <h3>Xabar: {rowData.comment}</h3>
          <hr />
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Nomi</TableCell>
                  <TableCell align="center">Soni</TableCell>
                  <TableCell align="right">Narx</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowData.cart.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button>Jami: {totalSum(rowData)}</Button>
            </div>
          </TableContainer>
        </React.Fragment>
      ) : (
        ""
      )}
    </div>
  );
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

  const column = [
    {
      title: "Xaridor",
      field: "imageUrl",
      render: (rowData) => <p>{rowData.name + " " + rowData.lname}</p>,
    },
    { title: "Tel raqam", field: "phoneNumber" },
    {
      title: "Sana/Vaqt",
      field: "createdAt",
      render: (rowData) => <p>{newDate(rowData.createdAt)}</p>,
    },
    {
      title: "Batafsil...",
      field: "more",
      editable: false,
      render: (rowData) =>
        rowData && (
          <Button color="primary" onClick={() => handleOpen(rowData)}>
            Batafsil...
          </Button>
        ),
    },
    {
      title: "Holati",
      field: "status",
      render: (rowData) => rowData && <p>Yetkazib berilgan</p>,
    },
  ];
  const deleteBook = async (data) => {
    await data.forEach((item) => {
      axios
        .delete("/api/payment/" + item._id, {
          headers: { Authorization: token },
        })
        .then((res) => setCallback(!callback));
    });
    toast.success("Mahsulotlar o'chirildi");
    handleDelClose();
  };
  const handleDelClose = () => {
    setOpenDel(!openDel);
  };
  return (
    <div>
      <Dialog
        open={openDel}
        onClose={handleDelClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Siz rostdan ham o'chirmoqchimisiz ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDelClose} color="primary">
            Yo'q
          </Button>
          <Button onClick={() => deleteBook(data)} color="primary" autoFocus>
            Ha
          </Button>
        </DialogActions>
      </Dialog>
      <div className="table-data">
        {loaderUp ? (
          <Loader
            style={{ textAlign: "center" }}
            type="ThreeDots"
            color="#00BFFF"
            height={50}
            width={50}
            timeout={3000} //3 secs
          />
        ) : (
          <MaterialTable
            title="Yetkazilgan buyurtmalar"
            icons={tableIcons}
            data={history}
            columns={column}
            responsive={true}
            options={{ exportButton: true, selection: true }}
            actions={[
              {
                tooltip: "Belgilangan ma'lumolarni o'chirish",
                icon: DeleteIcon,
                onClick: (evt, data) => {
                  setData(data);
                  handleDelClose();
                },
              },
            ]}
            localization={{
              toolbar: {
                searchPlaceholder: "qidiruv",
                nRowsSelected: '{0} ta mahsulot belgilandi'
              },
            }}
          />
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
    </div>
  );
}

export default SoldPro;
