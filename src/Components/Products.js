import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Row, Col, Button, Modal } from "react-bootstrap";

const Products = (props) => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);

  const fetchProducts = async () => {
    let config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
    };
    try {
      const res = await axios.get(
        `https://webhooktest61.advanceprotech.com/api/products?limit=${limit}`,
        config
      );

      setData(res.data.payload);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  window.onscroll = function () {
    let height1 = window.innerHeight + window.scrollY;
    let height2 = document.documentElement.offsetHeight;

    if (height1 + 2 >= height2) {
      let lastLimit = limit + 10;
      setLimit(lastLimit);

      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
    console.log("Called");
  }, []);
  return (
    <Row>
      {data.map((p) => (
        <Col sm={12} md={6} lg={4} xl={3} key={p.id}>
          <ProductCard product={p} />
        </Col>
      ))}
      {/* <Button onClick={loadMore}>Load more</Button> */}
    </Row>
  );
};

export default Products;
