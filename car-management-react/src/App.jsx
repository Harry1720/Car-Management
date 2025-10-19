import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/components/Navbar.module.css';
import './assets/css/components/Footer.module.css';

// Import pages
import Home from './pages/user/Home';
import About from './pages/user/About';
// import BanHang from './pages/user/BanHang';
// import Deposit from './pages/user/Deposit';
import Promotion from './pages/user/Promotion';
import Policy from './pages/user/Policy';
// import Login from './pages/user/Login';
import Charging from './pages/user/ChargingStation';

// // Admin pages
// import Dashboard from './pages/admin/Dashboard';
// import DSXe from './pages/admin/DSXe';
// import QLNhanSu from './pages/admin/QLNhanSu';

function App() {
  return (
    <Router>
      <Routes>
        {/* User routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/charging" element={<Charging />} />
        {/* <Route path="/products" element={<BanHang />} />
        <Route path="/deposit" element={<Deposit />} /> */}
        <Route path="/promotions" element={<Promotion />} />
        <Route path="/policy" element={<Policy />} />
        {/* <Route path="/login" element={<Login />} /> */}
        
        {/* Admin routes */}
        {/* <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/cars" element={<DSXe />} />
        <Route path="/admin/staff" element={<QLNhanSu />} /> */}
      </Routes>
    </Router>
  );
}

export default App;