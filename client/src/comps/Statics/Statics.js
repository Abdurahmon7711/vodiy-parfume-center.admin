import { Button, Card } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import { StoreG } from "../../Store/Store";
import Charts from "./Charts";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Loader from "react-loader-spinner"
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";

const column = [
  { title: "Mahsulot nomi", field: "title" },
  { title: "Soni", field: "quantity" },
  { title: "Narxi", field: "price" },
  { title: "Kategoriyasi", field: "category" },
  {
    title: "Rasm",
    field: "imageUrl",
    render: (rowData) => <img src={rowData.images.url} alt="asd" />,
  },
];

const Statics = () => {

  const history = useHistory()
  useEffect(()=>{
    const gogo = localStorage.getItem("admin")
    if(!gogo && gogo !== "1"){
      history.push("/")
      history.go()
    }
  },[]) 

  const state = useContext(StoreG);
  const [statics] = state.statics.statics;
  const [data, setData] = useState([]);
  const [day, setDay] = useState(0);
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    axios.get("/api/lastTenDayStatics/10")
      .then((res) => {
        setData(res.data)
        setLoader(false)
      });
  }, []);
  return (
    <div style={!loader ? {}: {height:"75vh",display:"flex", alignItems:"center", justifyContent:"center"}}>
      {
        !loader ? (
          <div>
            <div className="card-part">
              <Card className="card">
                <div className="card-wrapper">
                  <div>
                    <h3>Buyurtmalar</h3>
                  </div>
                  <div>
                    <h1>{statics.payments_number}</h1>
                  </div>
                </div>
              </Card>
              <Card className="card">
                <div className="card-wrapper">
                  <div>
                    <h3>Foydalanuvchilar</h3>
                  </div>
                  <div>
                    <h1>{statics.users_number}</h1>
                  </div>
                </div>
              </Card>
              <Card className="card">
                <div className="card-wrapper">
                  <div>
                    <h3>Xabarlar</h3>
                  </div>
                  <div>
                    <h1>{statics.payments_number}</h1>
                  </div>
                </div>
              </Card>
              <Card className="card">
                <div className="card-wrapper">
                  <div>
                    <h3>Mahsulotlar</h3>
                  </div>
                  <div>
                    <h1>{statics.products_number}</h1>
                  </div>
                </div>
              </Card>
            </div>

            <div className="chart-part">
              <div className="chart-part-wrapper">
                <Card className="card-chart">
                  <Charts />
                </Card>
              </div>
            </div>
            <div className="card-part">
              {data.length !== 0
                ? data.dates.map((item, index) => (
                  <Card className='card2'>
                    <div className="card-wrapper2">
                      <Button onClick={() => setDay(index)}>{item}</Button>
                    </div>
                  </Card>
                ))
                : ""}
            </div>
            <div className="table-data">
              <MaterialTable
                title="Yetkazilgan buyurtmalar"
                icons={tableIcons}
                options={{ exportButton: true }}
                data={data.length !== 0 ? data.days_products[day].products : data}
                columns={column}
                responsive={true}
                localization={{
                  toolbar: {
                    searchPlaceholder: "qidiruv"
                  },
                }}
              />
            </div>
          </div>
        ) : (
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={50}
            width={50}
            timeout={3000} //3 secs
          />
        )
      }
    </div>
  );
};

export default Statics;

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
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
