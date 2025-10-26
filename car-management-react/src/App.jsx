import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/components/Navbar.module.css';
import './assets/css/components/Footer.module.css';

// Import pages
import Home from './pages/user/Home';
import About from './pages/user/About';
import Products from './pages/user/Product';
import Deposit from './pages/user/Deposit';
import Promotion from './pages/user/Promotion';
import Policy from './pages/user/Policy';
import Login from './pages/user/Login';
import Charging from './pages/user/ChargingStation';

// // Admin pages
import Dashboard from './pages/admin/Dashboard';
// import DSXe from './pages/admin/DSXe';
import HRPage from './pages/admin/HumanResources';
import CustomerManage from './pages/admin/CustomerManage';

function App() {
  return (
    <Router>
      <Routes>
        {/* User routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/charging" element={<Charging />} />
        <Route path="/products" element={<Products />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/promotions" element={<Promotion />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        
        {/* Admin routes */}
         <Route path="/admin/dashboard" element={<Dashboard />} />
         <Route path="/admin/customermanagement" element={<CustomerManage />} />
        {/*<Route path="/admin/cars" element={<DSXe />} />*/}
        <Route path="/admin/humanresources" element={<HRPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;