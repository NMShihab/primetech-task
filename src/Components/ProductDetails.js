import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import { Modal } from "react-bootstrap";
import "./productDetails.css";

const ProductDetails = () => {
  console.log(window.location.pathname);
  let pathValue = window.location.pathname;
  pathValue = pathValue.split("/");
  pathValue = pathValue[pathValue.length - 1];
  console.log("pathvalue ", pathValue);

  const [token, setToken] = useContext(UserContext);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      let config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const res = await axios.get(
          `https://webhooktest61.advanceprotech.com/api/products/${pathValue}`,
          config
        );

        setData(res.data.payload);
        console.log(res.data.payload);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [pathValue]);

  return (
    <div className="product-detailts">
      <img src={data.image_url} alt="product-details" />
      <p>Id : {data.id}</p>
      <h3>{data.name}</h3>
      <p>sku : {data.sku}</p>
      <p>Available_quantity : {data.available_quantity}</p>
      <p>Type : {data.type}</p>
    </div>
  );
};

export default ProductDetails;
