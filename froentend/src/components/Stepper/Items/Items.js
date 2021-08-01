import React, { useState, useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
const Items = ({ id, qty }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get("http://localhost:5000/products/" + id).then((res) => {
      setData(res.data.result);
    });
  }, [setData, id]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "0 6em",
        maxHeight: "50%",
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
          Quantity:<strong>{qty}</strong>
        </p>
        <p>
          Category:<strong>{data.catagory}</strong>
        </p>
        <p>{data.description}</p>
        <p style={{ color: "red", fontSize: "2em" }}>₹ {data.price}</p>
      </div>
    </div>
  );
};

export default Items;
