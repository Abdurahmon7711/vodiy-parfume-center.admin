import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import { Editable } from "./Table";
import { withRouter } from "react-router-dom";
const Books = () => {
  const history = useHistory()
  useEffect(()=>{
    const gogo = localStorage.getItem("admin")
    if(!gogo && gogo !== "1"){
      history.push("/")
      history.go()
    }
  },[]) 
  
  return (
    <React.Fragment>
      <div>
        <Editable />
      </div>
    </React.Fragment>
  );
};

export default withRouter(Books);
