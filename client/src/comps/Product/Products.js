import React, { useContext, useEffect, useState } from "react";
import { forwardRef } from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import MaterialTable from "material-table";
import Edit from "@material-ui/icons/Edit";
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import Button from "@material-ui/core/Button";
import AddBox from "@material-ui/icons/AddBox";
import Search from "@material-ui/icons/Search";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import LastPage from "@material-ui/icons/LastPage";
import TextField from "@material-ui/core/TextField";
import FirstPage from "@material-ui/icons/FirstPage";
import FilterList from "@material-ui/icons/FilterList";
import ViewColumn from "@material-ui/icons/ViewColumn";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import Loader from "react-loader-spinner";
import { withRouter } from "react-router-dom";
import { StoreG } from "../../Store/Store";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../../utils/loading/Loading";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ReactPaginate from "react-paginate";

const initialState = {
  title: "",
  price: 0,
  description: "",
  number: 0,
  category: "",
};

const Products = () => {
  const history = useHistory();
  useEffect(() => {
    const gogo = localStorage.getItem("admin");
    if (!gogo && gogo !== "1") {
      history.push("/");
      history.go();
    }
  }, [history]);

  const [openAdd, setOpenAdd] = useState(false);
  const [loaderUp, setLoaderUP] = useState(true);
  const state = useContext(StoreG);
  const [product, setProduct] = useState(initialState);
  const [eproduct, setEproduct] = useState({});
  const [productId, setId] = useState("");
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [eimages, setEimages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = state.productsAPI.category;
  const [, setNumber] = state.productsAPI.number;
  const [, setPage] = state.productsAPI.page;
  const [result] = state.productsAPI.result;
  const [limit] = state.productsAPI.limit;

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const [products] = state.productsAPI.products;

  const [edit, setEdit] = useState(false);
  const [callback, setCallback] = state.productsAPI.callback;

  const handleClickAdd = () => {
    setOpenAdd(!openAdd);
  };
  useEffect(() => {
    products.length ? setLoaderUP(false) : setLoaderUP(true);
  }, [products]);
  useEffect(() => {
    const changeNumber = () => {
      setNumber("");
    };
    changeNumber();
  }, [setNumber]);
  // const [loader, setLoader] = useState(true)
  const [open, setOpen] = useState(false);

  const handleClick = (rowData) => {
    setEproduct({
      title: rowData.title,
      price: rowData.price,
      description: rowData.description,
      number: rowData.number,
      category: rowData.category,
    });
    setId(rowData._id);
    setEimages(rowData.images);
    setOpen(!open);
    setEdit(true);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return toast.warn("Siz admin emassiz");
      const file = e.target.files[0];

      if (!file) return toast.warn("Fayl mavjud emas");

      if (file.size > 1024 * 1024)
        // 1mb
        return toast.warn("Fayl juda katta!");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return toast.warn("Fayl formati noto'g'ri");

      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      edit ? setEimages(res.data) : setImages(res.data);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return toast.warn("Siz admin emassiz");
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: edit ? eimages.public_id : images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      edit ? setEimages(false) : setImages(false);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    edit
      ? setEproduct({ ...eproduct, [name]: value })
      : setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return toast.warn("Siz admin emassiz");
      if (!(edit ? eimages : images))
        return toast.warn("Siz rasm joylamadingiz !");

      if (edit) {
        await axios
          .put(
            `/api/products/${productId}`,
            { ...eproduct, images: eimages },
            {
              headers: { Authorization: token },
            }
          )
          .then((res) => {
            toast.success(res.data.msg);
          });
        setOpen(!open);
        setEdit(false);
      } else {
        await axios
          .post(
            "/api/products",
            { ...product, images },
            {
              headers: { Authorization: token },
            }
          )
          .then((res) => {
            setProduct({});
            setOpenAdd(!openAdd);
            setImages(false);
            toast.success(res.data.msg);
          });
      }
      setCallback(!callback);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteProduct = axios
        .delete(`/api/products/${id}`, {
          headers: { Authorization: token },
        })
        .then((res) => toast.success(res.data.msg));

      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const productInfo = {
    name: "Mahsulotlar",
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

  const [columns] = useState([
    { title: "Mahsulot", field: "title", width: "30%" },
    { title: "Soni", field: "number", type: "numeric", width: "10%" },
    { title: "Narx", field: "price", type: "numeric", width: "10%" },
    {
      title: "Kategoriya",
      field: "category",
      width: "20%",
      render: (rowData) => (
        <p>{categories.filter((item) => item._id === rowData.category)[0].name}</p>
      ),
    },
    { title: "Malumot", field: "description", width: "25%" },
    {
      title: "Rasm",
      field: "imageUrl",
      render: (rowData) => <img src={rowData.images.url} alt="asd" />,
    },
    {
      title: "Custom Add",
      field: "internal_action",
      width: "5%",
      editable: false,
      render: (rowData) =>
        rowData && (
          <IconButton color="secondary" onClick={() => handleClick(rowData)}>
            <Edit />
          </IconButton>
        ),
    },
  ]);

  const styleUpload = {
    display: images ? "block" : "none",
  };

  const estyleUpload = {
    display: eimages ? "block" : "none",
  };

  return (
    <div
    // style={!loaderUp ? {}: {height:"75vh",display:"flex", alignItems:"center", justifyContent:"center"}}
    >
      <div className="admin-products">
        <div>
          <ListItem button onClick={handleClickAdd}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Mahsulot qo'shish" />
            {openAdd ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openAdd} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>
                <div className="admin-product-edit">
                  <Card className="admin-product-edit-add">
                    <form onSubmit={handleSubmit}>
                      <TextField
                        name="title"
                        label="Product"
                        className="textInput"
                        onChange={handleChangeInput}
                      />
                      <TextField
                        name="description"
                        label="Ma'lumot"
                        className="textInput"
                        onChange={handleChangeInput}
                      />
                      <TextField
                        name="price"
                        label="Narx"
                        type="number"
                        className="textInput"
                        onChange={handleChangeInput}
                      />
                      <TextField
                        name="number"
                        label="Mahsulot soni"
                        type="number"
                        className="textInput"
                        onChange={handleChangeInput}
                      />
                      <Autocomplete
                        options={categories}
                        id="combo-box-demo"
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => {
                          setProduct({ ...product, category: newValue._id });
                        }}
                        name="category"
                        renderInput={(params) => (
                          <TextField
                            className="textInput"
                            {...params}
                            label="Kategoriya"
                            margin="normal"
                          />
                        )}
                      />
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        className="btn-admin-add"
                      >
                        Qo'shish
                      </Button>
                    </form>
                    <div>
                      <span className="admin-add-img">
                        <div className="upload">
                          <input
                            type="file"
                            name="file"
                            id="file_up"
                            onChange={handleUpload}
                          />
                          {loading ? (
                            <div id="file_img">
                              <Loading />
                            </div>
                          ) : (
                            <div id="file_img" style={styleUpload}>
                              <img src={images ? images.url : ""} alt="" />
                              <span onClick={handleDestroy}>X</span>
                            </div>
                          )}
                        </div>
                      </span>
                    </div>
                  </Card>
                </div>
              </ListItem>
            </List>
          </Collapse>
        </div>
        <div>
          {/*         <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Mahsulotni yangilash" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem> */}
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>
                <div className="admin-product-edit">
                  <Card className="admin-product-edit-add">
                    <form onSubmit={handleSubmit}>
                      <TextField
                        name="title"
                        label="Product"
                        className="textInput"
                        onChange={handleChangeInput}
                        value={eproduct.title}
                      />
                      <TextField
                        name="description"
                        value={eproduct.description}
                        label="Ma'lumot"
                        className="textInput"
                        onChange={handleChangeInput}
                      />
                      <TextField
                        name="price"
                        value={eproduct.price}
                        label="Narx"
                        type="number"
                        className="textInput"
                        onChange={handleChangeInput}
                      />
                      <TextField
                        name="number"
                        value={eproduct.number}
                        label="Soni"
                        type="number"
                        className="textInput"
                        onChange={handleChangeInput}
                      />
                      <Autocomplete
                        value={
                          categories[
                            categories.findIndex(
                              (item) => item._id === eproduct.category
                            )
                          ]
                        }
                        options={categories}
                        id="combo-box-demo"
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => {
                          setEproduct({ ...eproduct, category: newValue._id });
                        }}
                        name="category"
                        renderInput={(params) => (
                          <TextField
                            className="textInput"
                            {...params}
                            label="Kategoriya"
                            margin="normal"
                          />
                        )}
                      />
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        className="btn-admin-add"
                      >
                        Yangilash
                      </Button>
                    </form>
                    <div>
                      <span className="admin-add-img">
                        <div className="upload">
                          <input
                            type="file"
                            name="file"
                            id="file_up"
                            onChange={handleUpload}
                          />
                          {loading ? (
                            <div id="file_img">
                              <Loading />
                            </div>
                          ) : (
                            <div id="file_img" style={estyleUpload}>
                              <img src={eimages ? eimages.url : ""} alt="" />
                              <span onClick={handleDestroy}>X</span>
                            </div>
                          )}
                        </div>
                      </span>
                    </div>
                  </Card>
                </div>
              </ListItem>
            </List>
          </Collapse>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "center",
          }}
        >
          <Card
            className="card"
            style={{ width: "48%", padding: "20px", textAlign: "center" }}
          >
            <h2>Kategoriya bo'yicha tartiblash</h2>
          </Card>
          <Autocomplete
            id="combo-box-demo"
            value={
              categories[categories.findIndex((item) => item._id === category)]
            }
            onChange={(event, newValue) => {
              newValue
                ? setCategory("category=" + newValue._id)
                : setCategory("");
            }}
            options={categories}
            getOptionLabel={(option) => option.name}
            style={{ width: "50%", margin: "10px 0" }}
            renderInput={(params) => (
              <TextField {...params} label="Kategoriya" variant="outlined" />
            )}
          />
        </div>
        <Loader
          style={loaderUp ? { textAlign: "center" } : { display: "none" }}
          type="ThreeDots"
          color="#00BFFF"
          height={50}
          width={50}
          timeout={500} //3 secs
        />
        <MaterialTable
          title={productInfo.name}
          style={loaderUp ? { display: "none" } : { display: "block" }}
          columns={columns}
          data={products}
          icons={tableIcons}
          options={{ exportButton: true }}
          responsive={true}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  deleteProduct(oldData._id, oldData.images.public_id);
                  resolve();
                }, 1000);
              }),
          }}
          localization={{
            body: {
              editRow: {
                deleteText: "Ma'lumotni o'chirishni tasdiqlaysizmi ?",
              },
            },
            toolbar: {
              searchPlaceholder: "qidiruv",
            },
          }}
        />

        <ReactPaginate
          style={loaderUp ? { display: "none" } : { display: "block" }}
          previousLabel={"Oldingi"}
          nextLabel={"Keyingi"}
          pageCount={Math.ceil(result / limit)}
          onPageChange={({ selected }) => setPage(selected + 1)}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
      {/* {
        !loaderUp ? (
         
        ):(
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={50}
            width={50}
            timeout={3000} //3 secs
          />
        )
      } */}
    </div>
  );
};

export default withRouter(Products);
