import { useState, useEffect } from "react";
import axios from "axios";

function ProductsAPI() {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [number, setNumber] = useState(2);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const getProducts = async () => {
      setLoader(true);
      const res = await axios.get(
        `/api/products?limit=${limit}&page=${page}&${category}&${number}&${sort}&title[regex]=${search}`
      );
      setProducts(res.data.products);
      setResult(res.data.result);
      setLoader(false);
    };
    getProducts();
  }, [callback, category, number, sort, search, limit, page]);

  return {
    products: [products, setProducts],
    loader: [loader, setLoader],
    callback: [callback, setCallback],
    category: [category, setCategory],
    number: [number, setNumber],
    sort: [sort, setSort],
    search: [search, setSearch],
    limit: [limit, setLimit],
    page: [page, setPage],
    result: [result, setResult],
  };
}

export default ProductsAPI;
