import React, { useContext, useState, useEffect } from "react";
import { forwardRef } from "react";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import MaterialTable from "material-table";
import Edit from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import Button from "@material-ui/core/Button";
import AddBox from "@material-ui/icons/AddBox";
import AddBoxIcon from '@material-ui/icons/AddBox';
import Search from "@material-ui/icons/Search";
import Remove from "@material-ui/icons/Remove";
import Loader from "react-loader-spinner"
import SaveAlt from "@material-ui/icons/SaveAlt";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import LastPage from "@material-ui/icons/LastPage";
import TextField from "@material-ui/core/TextField";
import FirstPage from "@material-ui/icons/FirstPage";
import FilterList from "@material-ui/icons/FilterList";
import ViewColumn from "@material-ui/icons/ViewColumn";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import { Link, useHistory, withRouter } from "react-router-dom";
import "./ImgUploadStyle.css";
import { StoreG } from "../../Store/Store";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../../utils/loading/Loading";

const Products = () => {
  const history = useHistory()

  useEffect(()=>{
    const gogo = localStorage.getItem("admin")
    if(!gogo && gogo !== "1"){
      history.push("/")
      history.go()
    }
  },[]) 

  const [openAdd, setOpenAdd] = useState(false);
  const state = useContext(StoreG);
  const [category, setCategory] = useState("");
  const [ecategory, setEcategory] = useState("");
  const [catId, setCatId] = useState("");
  const [images, setImages] = useState(false);
  const [eimages, setEimages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaderUp, setLoaderUp] = useState(true)
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const [categories] = state.categoriesAPI.categories;

  const [callback, setCallback] = state.categoriesAPI.callback;
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
      await axios
        .post("/api/upload", formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          },
        })
        .then((res) => {
          toast.success(res.data.msg);
          setLoading(false);
          console.log(res);
          setImages(res.data);
        });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  const ehandleUpload = async (e) => {
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
      await axios
        .post("/api/upload", formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          },
        })
        .then((res) => {
          toast.success(res.data.msg);
          console.log(res);
          setLoading(false);
          setEimages(res.data);
        });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  const handleDestroy = async () => {
    try {
      if (!isAdmin) return toast.warn("Siz admin emassiz");
      setLoading(true);
      await axios
        .post(
          "/api/destroy",
          { public_id: images.public_id },
          {
            headers: { Authorization: token },
          }
        )
        .then((res) => {
          toast.success(res.data.msg);
        });
      setLoading(false);
      setImages(false);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  const ehandleDestroy = async () => {
    try {
      if (!isAdmin) return toast.warn("Siz admin emassiz");
      setLoading(true);
      await axios
        .post(
          "/api/destroy",
          { public_id: eimages.public_id },
          {
            headers: { Authorization: token },
          }
        )
        .then((res) => {
          toast.success(res.data.msg);
        });
      setLoading(false);
      setEimages(false);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return toast.warn("Siz admin emassiz");
      if (!images) return toast.warn("Siz rasm joylamadingiz !");
      await axios
        .post(
          "/api/category",
          { name: category, images },
          {
            headers: { Authorization: token },
          }
        )
        .then((res) => {
          setCategory("");
          toast.success(res.data.msg);
          setCallback(!callback);
          setOpenAdd(!openAdd);
          setImages(false);
        });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const ehandleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return toast.warn("Siz admin emassiz");
      if (!eimages) return toast.warn("Siz rasm joylamadingiz !");
      await axios
        .put(
          `/api/category/${catId}`,
          { name: ecategory, images: eimages },
          {
            headers: { Authorization: token },
          }
        )
        .then((res) => {
          toast.success(res.data.msg);
        });
      setCallback(!callback);
      setOpen(!open);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const deleteCategory = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios
        .post(
          "/api/destroy",
          { public_id },
          {
            headers: { Authorization: token },
          }
        )
        .then((res) => {
          toast.success(res.data.msg);
        });
      const deleteProduct = axios
        .delete(`/api/category/${id}`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          toast.success(res.data.msg);
        });

      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    setCategory(e.target.value);
  };

  const ehandleChangeInput = (e) => {
    setEcategory(e.target.value);
  };

  const handleClickAdd = () => {
    setOpenAdd(!openAdd);
  };

  const [open, setOpen] = useState(false);
  const handleClick = (rowData) => {
    setEcategory(rowData.name);
    setEimages(rowData.images);
    setCatId(rowData._id);
    setOpen(!open);
  };

  const productInfo = {
    name: "Kategoriya",
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
    { title: "Kategoriya", field: "name", width: "30%" },
    {
      title: "Rasm",
      field: "imageUrl",
      render: (rowData) => <img src={rowData.images.url} alt="asd" />,
    },
    {
      title: "Mahsulotlarni ko'rish",
      field: "_id",
      render: (rowData) => (
        <Link to={"/Kategoriya/" + rowData._id}>Kategoriya mahsulotlari</Link>
      ),
    },
    {
      title: "Edit",
      field: "internal_action",
      width: "10%",
      editable: false,
      render: (rowData) =>
        rowData && (
          <IconButton color="secondary" onClick={() => handleClick(rowData)}>
            <Edit />
          </IconButton>
        ),
    },
  ]);

  const estyleUpload = {
    display: eimages ? "block" : "none",
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };

  useEffect(() => {
    categories.length ? setLoaderUp(false) : setLoaderUp(true)
  }, [categories])

  return (
    <div style={!loaderUp ? {}: {height:"75vh",display:"flex", alignItems:"center", justifyContent:"center"}}>
      {
        loaderUp ? (
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={50}
            width={50}
            timeout={3000} //3 secs
          />
        ) : (
          <div className="admin-categories">
            <div>
              <ListItem button onClick={handleClickAdd}>
                <ListItemIcon>
                  <AddBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Kategoriya qo'shish" />
                {openAdd ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openAdd} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem>
                    <div className="admin-product-edit">
                      <Card className="admin-product-edit-add">
                        <form onSubmit={handleSubmit}>
                          <div>
                            <TextField
                              className="textInput"
                              value={category}
                              label="Kategoriya nomi"
                              onChange={handleChangeInput}
                            />
                            <Button
                              className="btn-admin-add"
                              variant="contained"
                              color="primary"
                              type="submit"
                            >
                              Add
                      </Button>
                          </div>
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
          <ListItemText primary="Kategoriyani yangilash" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem> */}
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem>
                    <div className="admin-product-edit">
                      <Card className="admin-product-edit-add">
                        <form onSubmit={ehandleSubmit}>
                          <div>
                            <TextField
                              className="textInput"
                              value={ecategory}
                              placeholder="Kategoriya nomi"
                              onChange={ehandleChangeInput}
                            //   label="Kategoriya"
                            />
                            <Button
                              type="submit"
                              className="btn-admin-add"
                              variant="contained"
                              color="primary"
                            >
                              Yangilash
                      </Button>
                          </div>
                        </form>
                        <div>
                          <span className="admin-add-img">
                            <div className="upload">
                              <input
                                type="file"
                                name="file"
                                id="file_up"
                                onChange={ehandleUpload}
                              />
                              {loading ? (
                                <div id="file_img">
                                  <Loading />
                                </div>
                              ) : (
                                <div id="file_img" style={estyleUpload}>
                                  <img src={eimages ? eimages.url : ""} alt="" />
                                  <span onClick={ehandleDestroy}>X</span>
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
            <MaterialTable
              title={productInfo.name}
              columns={columns}
              data={categories}
              icons={tableIcons}
              options={{ exportButton: true }}
              responsive={true}
              editable={{
                onRowDelete: (oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      deleteCategory(oldData._id, oldData.images.public_id);
                      resolve();
                    }, 1000);
                  }),
              }}
              localization={{
                toolbar: {
                  searchPlaceholder: "qidiruv"
                },
                body: {
                  editRow: {
                    deleteText: "Ma'lumotni o'chirishni tasdiqlaysizmi ?",
                  },
                },
              }}
            />
          </div>
        )
      }
    </div>

  );
};

export default withRouter(Products);
