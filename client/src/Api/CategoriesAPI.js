import { useState, useEffect } from "react";
import axios from "axios";

function CategoriesAPI() {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setLoader(true);
    const getCategories = async () => {
      const res = await axios.get("/api/category");
      setCategories(res.data);
      setLoader(false);
    };

    getCategories();
  }, [callback]);
  return {
    loader: [loader, setLoader],
    categories: [categories, setCategories],
    callback: [callback, setCallback],
  };
}

export default CategoriesAPI;
