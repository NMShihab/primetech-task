import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Products from "./Products";

const Home = () => {
  const [token, setToken] = useContext(UserContext);

  // var token = localStorage.getItem("token");
  console.log("From Home ", token);
  return (
    <div className="p-5">
      <Products token={token} />
    </div>
  );
};

export default Home;
