import Card from "../../common/Card/Card";
import React, { useState, useEffect } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginBottom: "1em",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const Home = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });
  const [productData, setProductData] = useState([{}]);
  const [catagories, setCatagories] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/products").then((res) => {
      setProductData(res.data.result);
    });
  }, [setProductData]);
  const handleChange = (event) => {
    const name = event.target.name;
    console.log(name);
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <div
      style={{
        padding: "0 4em",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="all" aria-label="left aligned">
            All
          </ToggleButton>
          <ToggleButton value="apparel" aria-label="centered">
            Apparel
          </ToggleButton>
          <ToggleButton value="furniture" aria-label="centered">
            Furniture
          </ToggleButton>
          <ToggleButton value="electronics" aria-label="right aligned">
            Electronics
          </ToggleButton>
          <ToggleButton value="personalCare" aria-label="justified">
            Personal Care
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <Typography style={{ textAlign: "start" }} variant="p" component="p">
        Sort By:
      </Typography>{" "}
      <FormControl className={classes.formControl}>
        <Select
          variant="outlined"
          value={state.age}
          onChange={(e) => handleChange(e)}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>Default</em>
          </MenuItem>
          <MenuItem name="highToLow" value={10}>
            Price: High to Low
          </MenuItem>
          <MenuItem name="lowToHigh" value={20}>
            Price: Low to High{" "}
          </MenuItem>
          <MenuItem name="newest" value={30}>
            Newest
          </MenuItem>
        </Select>
      </FormControl>
      <div style={{ display: "flex" }}>
        {productData &&
          productData.map((obj) => {
            return <Card key={obj._id} productData={obj} />;
          })}
      </div>
    </div>
  );
};

export default Home;
