import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import PrivateRoute from "./Components/PrivateRoute";
import AdminRoute from "./Components/AdminRoute";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Product from "./Pages/Product";
import ProductsList from "./Pages/ProductsList";
import Admin from './Pages/Admin';
import ProductRegist from './Pages/ProductRegist';
import ShoppingCart from './Pages/ShoppingCart';
import Payment from './Pages/Payment';
import PaymentCompleted from './Pages/PaymentCompleted';
import Account from './Pages/Account';
import MainNav from './Components/MainNav';
import SubNav from './Components/SubNav';

function App() {

  return (
    <Router>
      <MainNav />
      <SubNav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/product/:productId" component={Product} />
        <Route path="/categories/:main/:sub" component={ProductsList} />
        <Route path="/categories/:main" component={ProductsList} />
        <AdminRoute path="/admin">
          <Admin />
        </AdminRoute>
        <AdminRoute path="/regist">
          <ProductRegist />
        </AdminRoute>
        <PrivateRoute path="/shoppingcart">
          <ShoppingCart />
        </PrivateRoute>
        <PrivateRoute path="/payment">
          <Payment />
        </PrivateRoute>
        <PrivateRoute path="/paymentcompleted">
          <PaymentCompleted />
        </PrivateRoute>
        <PrivateRoute path="/account">
          <Account />
        </PrivateRoute>

        <Redirect path="/" to="/" />
      </Switch>
    </Router>
  )
}

export default App;