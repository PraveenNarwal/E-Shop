import React, { useState, useEffect } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [qty, setQty] = useState(0);
  const history = useHistory();
  useEffect(() => {
    axios.get("http://localhost:5000/products/" + id).then((res) => {
      setData(res.data.result);
    });
  }, [setData, id]);
  const placeorder = () => {
    if (qty !== 0) {
      history.push("/placeorder/" + data._id + "/" + qty);
    }
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "5em 6em",
          height: "40%",
        }}
      >
        <div
          style={{
            width: "40%",
          }}
        >
          <img style={{ maxWidth: "70%" }} src={data.image_url} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ marginRight: "0.5em" }}>{data.name}</h1>
            <Chip
              color="primary"
              label={`Available Items:${data.available_items}`}
            />
          </div>
          <p>
            Category:<strong>{data.catagory}</strong>
          </p>
          <p>{data.description}</p>
          <p style={{ color: "red", fontSize: "2em" }}>₹ {data.price}</p>
          <TextField
            required
            style={{ width: "80%", marginBottom: "1em" }}
            id="outlined-required"
            label="Enter Quantity"
            onChange={(e) => setQty(e.target.value)}
            variant="outlined"
          />

          <Button
            type="submit"
            style={{ width: "50%" }}
            variant="contained"
            color="primary"
            onClick={placeorder}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
