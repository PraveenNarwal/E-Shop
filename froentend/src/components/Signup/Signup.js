import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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

export default function SignUp() {
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
  });

  const signupUser = (e) => {
    state[e.target.name] = e.target.value;
    setState(state);
    console.log(state);
  };

  const { first_name, last_name, email, phone_number, password } = state;
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/users", state).then(() => {
      history.push("/login");
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={(e) => onSubmit(e)} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            onChange={(e) => signupUser(e)}
            margin="normal"
            required
            fullWidth
            label="First Name"
            name="first_name"
            autoFocus
          />
          <TextField
            variant="outlined"
            onChange={(e) => signupUser(e)}
            margin="normal"
            required
            fullWidth
            name="last_name"
            label="Last Name"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            onChange={(e) => signupUser(e)}
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            onChange={(e) => signupUser(e)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <TextField
            variant="outlined"
            onChange={(e) => signupUser(e)}
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="password"
            autoComplete="current-password"
          /> */}
          <TextField
            variant="outlined"
            onChange={(e) => signupUser(e)}
            margin="normal"
            required
            fullWidth
            name="phone_number"
            label="Contact Number"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e) => onSubmit(e)}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
