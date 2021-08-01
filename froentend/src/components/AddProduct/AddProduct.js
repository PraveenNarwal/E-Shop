import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function AddProduct() {
  const history = useHistory();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const classes = useStyles();
  const [state, setState] = React.useState({
    name: "",
    category: "",
    price: 0,
    available_items: 0,
    image_url: "",
    description: "",
    manufacturer: "",
  });
  const [open, setOpen] = React.useState(false);
  const {
    name,
    category,
    price,
    available_items,
    image_url,
    description,
    manufacturer,
  } = state;
  const setDataToState = (e) => {
    state[e.target.name] = e.target.value;
    setState(state);
    console.log(state);
  };
  const addDataOnSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/products", state, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then(() => {
        setOpen(true);
        setState({
          name: "",
          catagory: "",
          price: 0,
          available_items: 0,
          image_url: "",
          description: "",
          manufacturer: "",
        });
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add Product
        </Typography>
        <form
          onSubmit={(e) => addDataOnSubmit(e)}
          className={classes.form}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            defaultValue={name}
            fullWidth
            label="Name"
            onChange={(e) => setDataToState(e)}
            name="name"
            autoComplete="email"
            autoFocus
          />

          <Autocomplete
            id="combo-box-demo"
            options={[
              { title: "Apparel" },
              { title: "Electronics" },
              { title: "Footwear" },
              { title: "Personal-Care" },
            ]}
            name="category"
            onChange={setDataToState}
            getOptionLabel={(option) => option.title}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                defaultValue={category}
                name="category"
                label="Category"
                required
                onChange={(e) => setDataToState(e)}
                {...params}
                variant="outlined"
              />
            )}
          />
          <TextField
            variant="outlined"
            margin="normal"
            defaultValue={manufacturer}
            required
            onChange={(e) => setDataToState(e)}
            fullWidth
            name="manufacturer"
            label="Manufacturer"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            defaultValue={available_items}
            type="number"
            onChange={(e) => setDataToState(e)}
            margin="normal"
            required
            fullWidth
            name="available_items"
            label="Available Items"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            type="number"
            onChange={(e) => setDataToState(e)}
            defaultValue={price}
            required
            fullWidth
            name="price"
            label="Price"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            defaultValue={image_url}
            onChange={(e) => setDataToState(e)}
            fullWidth
            name="image_url"
            label="Image URL"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            onChange={(e) => setDataToState(e)}
            fullWidth
            defaultValue={description}
            name="description"
            label="Product Description"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e) => addDataOnSubmit(e)}
            className={classes.submit}
          >
            Save Product
          </Button>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Product {state.name} added succesfully!
          </Alert>
        </Snackbar>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
