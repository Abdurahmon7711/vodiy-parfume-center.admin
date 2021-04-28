import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);
  const [user, setUser] = useState([]);
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          await axios
            .get("/user/infor", {
              headers: { Authorization: token },
            })
            .then((res) => {
              setUser(res.data);
              setIsLogged(true);
              if (res.data.role === 1) {
                setIsAdmin(true);
              } else {
                setIsAdmin(false);
                toast.error("Siz admin emassiz");
              }
            });
        } catch (err) {
          toast.error(err);
        }
      };

      getUser();
    }
  }, [callback, token]);

  return {
    user: [user, setUser],
    callback: [callback, setCallback],
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    history: [history, setHistory],
  };
}

export default UserAPI;
