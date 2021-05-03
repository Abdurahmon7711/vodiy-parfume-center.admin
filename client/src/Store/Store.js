import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import UserAPI from "../Api/UserAPI";
import { toast } from "react-toastify";
// import UsersAPI from "../Api/UsersAPI";
import CategoriesAPI from "../Api/CategoriesAPI";
import ProductsAPI from "../Api/ProductsAPI";
import StaticsAPI from "../Api/StaticsAPI";
import AddressesAPI from "../Api/AddressesAPI";
// import PaymentsAPI from "../Api/PaymentsAPI";

export const StoreG = createContext();

const Store = (props) => {
  const [notFound, setNotFound] = useState(false);
  const [token, setToken] = useState(false);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        try {
          const res = await axios.get("/user/refresh_token");

          setToken(res.data.accesstoken);

          setTimeout(() => {
            refreshToken();
          }, 10 * 60 * 1000);
        } catch (err) {
          toast.error(err.response.data.msg);
        }
      };
      refreshToken();
    }
  }, []);
  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
    // usersAPI: UsersAPI(token),
    statics: StaticsAPI(),
    categoriesAPI: CategoriesAPI(),
    addressesAPI: AddressesAPI(token),
    setNotFound,
    notFound,
    // paymentsAPI: PaymentsAPI(token),
  };

  return <StoreG.Provider value={state}>{props.children}</StoreG.Provider>;
};

export default Store;
