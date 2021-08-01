import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles({
  root: {
    maxWidth: 275,
    margin: "2em",
  },
});

export default function ImgMediaCard(params) {
  const classes = useStyles();
  const [role, setRole] = useState("");
  const history = useHistory();
  const token = localStorage.getItem("token");
  const deleteProduct = () => {
    axios
      .delete("http://localhost:5000/products/" + params.productData._id, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then(() => {
        history.push("/");
      });
  };
  useEffect(() => {
    localStorage.getItem("role") && setRole(localStorage.getItem("role"));
  }, [setRole]);
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={params.productData.image_url}
          title="Contemplative Reptile"
        />
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="h6" component="p">
              {params.productData.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="p">
              {params.productData.price}
            </Typography>
          </div>
          <Typography variant="body2" color="textSecondary" component="p">
            {params.productData.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        {localStorage.getItem("isAuthenticated") === "true" && (
          <>
            <Link to={`/product/${params.productData._id}`}>
              <Button variant="contained" size="small" color="primary">
                Buy
              </Button>
            </Link>
            <div>
              {role === "ADMIN" && (
                <>
                  <Link to={`/modifyproduct/${params.productData._id}`}>
                    <IconButton>
                      <EditIcon style={{ color: "lightgray" }} />
                    </IconButton>
                  </Link>
                  <IconButton onClick={() => deleteProduct()}>
                    <DeleteIcon style={{ color: "lightgray" }} />
                  </IconButton>
                </>
              )}
            </div>
          </>
        )}
      </CardActions>
    </Card>
  );
}
