import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { toast } from "react-toastify";
import axios from "axios";

const Exit = () => {
  const [user, setUser] = useState({
    login: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user }).then((res) => {
        localStorage.setItem("admin", res.data.user.role);
        localStorage.setItem("firstLogin", true);
        res.data.user.role === 1
          ? (window.location.href = "/Buyurtmalar")
          : toast.error("Siz admin emassiz");
      });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  };
  return (
    <div className="container-login">
      <Card className="container-login-card">
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
