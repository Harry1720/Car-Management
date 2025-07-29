import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/components/navigation.css';
import './assets/css/components/footer.css';

// Import pages
import Home from './pages/user/Home';
import AboutVF from './pages/user/AboutVF';
import BanHang from './pages/user/BanHang';
import Deposit from './pages/user/Deposit';
import UuDai from './pages/user/UuDai';
import ChinhSach from './pages/user/ChinhSach';
import Login from './pages/user/Login';

// Admin pages
import Dashboard from './pages/admin/Dashboard';
import DSXe from './pages/admin/DSXe';
import QLNhanSu from './pages/admin/QLNhanSu';

function App() {
  return (
    <Router>
      <Routes>
        {/* User routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutVF />} />
        <Route path="/products" element={<BanHang />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/promotions" element={<UuDai />} />
        <Route path="/policy" element={<ChinhSach />} />
        <Route path="/login" element={<Login />} />
        
        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/cars" element={<DSXe />} />
        <Route path="/admin/staff" element={<QLNhanSu />} />
      </Routes>
    </Router>
  );
}

export default App;