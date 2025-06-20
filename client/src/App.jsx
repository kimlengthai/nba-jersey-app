import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import MyProfile from './pages/MyProfile';
import Catalogue from './pages/Catalogue';
import Cart from './pages/Cart';

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
        </Routes>
      </BrowserRouter>
    );
}

export default App;