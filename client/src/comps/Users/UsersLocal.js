import React, { useContext, useState, useEffect } from "react";
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
import "./ImgUploadStyle.css";

const UsersLocal = () => {
    const [region, setRegion] = useState([
        { name: "Beshariq" },
        { name: "Buvayda" },
        { name: "Dang'ara" },
        { name: "Furqat" },
    ])
    const handleClick = (data) => {
        console.log(data)
    }
    const [columns] = useState([
        { title: "Manzil", field: "name", width: "30%" },
        {
            title: "Foydalanuvchilarni ko'rish",
            field: "_id",
            editable: false,
            render: (rowData) => (
                <Link to={`/Foydalanuvchilar/${rowData.name}`}>Manzil foydalanuvchilari</Link>
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
            <MaterialTable
                title="Foydalanuvchilar"
                columns={columns}
                data={region}
                icons={tableIcons}
                options={{ exportButton: true }}
                responsive={true}
                editable={{
                    onRowDelete: (oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...region];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setRegion([...dataDelete]);
                                resolve()
                            }, 1000);
                        }),

                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                 setRegion([...region, newData]); 
                                resolve();
                            }, 1000);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...region];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setRegion([...dataUpdate]);
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
        </div>
    )
}

export default UsersLocal
