import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import MyProfile from './pages/MyProfile';
import Catalogue from './pages/Catalogue';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Payment from './pages/Payment';
import Payments from './pages/Payments';
import AllOrders from './pages/AllOrders';
import CreateProduct from './pages/CreateProduct';
import ProtectedRoute from './components/ProtectedRoute';

function App() 
{
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/orders/all" element={<AllOrders />} />
          <Route path="/create-product" element={<ProtectedRoute element={<CreateProduct />} allowedRoles={['staff']} />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;