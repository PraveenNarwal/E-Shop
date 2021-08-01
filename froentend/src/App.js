import Navbar from "./common/Navbar/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import AddProduct from "./components/AddProduct/AddProduct";
import Home from "./components/Home/Home";
import Product from "./components/Product/Product";
import ModifyProduct from "./components/ModifyProduct/ModifyProduct";
import PlaceOrder from "./components/Stepper/index";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/addproduct" component={AddProduct} />
        <Route exact path="/product/:id" component={Product} />
        <Route exact path="/modifyproduct/:id" component={ModifyProduct} />
        <Route exact path="/placeorder/:id/:qty" component={PlaceOrder} />
      </Router>
    </div>
  );
}

export default App;
