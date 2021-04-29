import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Loader from "react-loader-spinner"
import { toast } from "react-toastify";
import axios from "axios";

const Exit = () => {

  useEffect(()=>{
    localStorage.removeItem("admin")
  },[])

  const [loader, setLoader] = useState(false)

  const [user, setUser] = useState({
    login: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    setLoader(true)
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user }).then((res) => {
        localStorage.setItem("admin", res.data.user.role);
        localStorage.setItem("firstLogin", true);
        res.data.user.role === 1
          ? (window.location.href = "/Statistika")
          : toast.error("Siz admin emassiz");
        setLoader(false)
      });
    } catch (err) {
      toast.error(err.response.data.msg);
      setLoader(false)
    }
  };
  return (
    <div className="container-login">
      <Card className="container-login-card">
        {
          loader ? (
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={30}
              width={30}
              timeout={3000} //3 secs
            />
          ) : null
        }
        <div className="login">
          <form onSubmit={loginSubmit}>
            <h2>Admin</h2>
            <input
              label="Login"
              type="text"
              name="login"
              placeholder="login..."
              value={user.login}
              onChange={onChangeInput}
            />

            <input
              type="password"
              label="Password"
              name="password"
              placeholder="password..."
              value={user.password}
              onChange={onChangeInput}
            />

            <Button
              type="submit"
              className="btn-auth"
              variant="contained"
              color="primary"
            >
              Kirish
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Exit;
