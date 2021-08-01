import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ModifyProduct() {
  const classes = useStyles();
  const { id } = useParams();
  const [data, setData] = useState({});
  const history = useHistory();
  useEffect(() => {
    axios.get("http://localhost:5000/products/" + id).then((res) => {
      setData(res.data.result);
    });
  }, [setData, id]);

  const update = () => {
    axios
      .put(
        "http://localhost:5000/products/" + id,
        data,

        {
          headers: { authorization: localStorage.getItem("token") },
        }
      )
      .then((response) => {
        history.push("/");
      });
  };

  console.log(data);

  const updateValue = (e) => {
    const { name, value } = e.target;
    setData((state) => {
      return { ...state, [name]: value };
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Modify Product
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            onChange={updateValue}
            value={data.name}
          />

          <Autocomplete
            id="combo-box-demo"
            options={[
              { title: "Apparel" },
              { title: "Electronics" },
              { title: "Footwear" },
              { title: "Personal-Care" },
            ]}
            getOptionLabel={(option) => option.title}
            fullWidth
            renderInput={(params) => (
              <TextField
                name="catagory"
                {...params}
                variant="outlined"
                value={data.catagory}
                onChange={updateValue}
              />
            )}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="manufacturer"
            label="Manufacturer"
            id="password"
            onChange={updateValue}
            value={data.manufacturer}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="available_items"
            label="Available Items"
            onChange={updateValue}
            value={data.available_items}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="price"
            label="Price"
            value={data.price}
            id="password"
            onChange={updateValue}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="image_url"
            value={data.image_url}
            label="Image URL"
            id="password"
            onChange={updateValue}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={data.description}
            name="description"
            label="Product Description"
            id="password"
            onChange={updateValue}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={update}
            className={classes.submit}
          >
            Save Product
          </Button>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
