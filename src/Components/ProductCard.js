import React from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
const ProductCard = (props) => {
  //   console.log("product", props);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isShow, setIsShow] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [token, setToken] = React.useContext(UserContext);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const showComp = () => {
    setIsShow(true);
  };

  const hideComp = () => {
    setIsShow(false);
  };

  const fetchProducts = async (e) => {
    e.preventDefault();

    if (!isShow) {
      let config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const res = await axios.get(
          `https://webhooktest61.advanceprotech.com/api/warehouseInventory?product_id=${props.product.id}`,
          config
        );
        setData([]);
        setData(res.data.payload);

        console.log(res.data.payload);
      } catch (error) {
        console.error(error);
      }
    }
    setIsShow(!isShow);
  };

  console.log(isShow);

  return (
    <div>
      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>{props.product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={props.product.image_url} alt="product-details" />
          <p>Id : {props.product.id}</p>
          <h3>{props.product.name}</h3>
          <p>sku : {props.product.sku}</p>
          <p>Available_quantity : {props.product.available_quantity}</p>
          <p>Type : {props.product.type}</p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={hideModal}>Cancel</button>
          <button>Save</button>
        </Modal.Footer>
      </Modal>
      <Card className="p-3 my-3 rounded">
        <Card.Body>
          <Card.Title as="div">{props.product.name}</Card.Title>

          <Card.Text as="div">
            <div className="my-3"> Sku : {props.product.sku}</div>
          </Card.Text>
          <Card.Text as="div">
            <div className="my-3">
              {" "}
              <Button onClick={fetchProducts}>Total Quantity </Button>:{" "}
              {props.product.total_quantity}
            </div>
            <div>
              {data &&
                isShow &&
                data.map((d, index) => (
                  <ul key={index}>
                    {d.warehouse_name} : {d.available_quantity}
                  </ul>
                ))}
            </div>
          </Card.Text>
          <Card.Text as="h3">Price: ${props.product.selling_price}</Card.Text>
          {/* <Link to={`product/${props.product.id}`}>
            <Button>Details</Button>
          </Link> */}
          <Button onClick={showModal}>Details</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
