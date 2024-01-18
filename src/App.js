import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import UserRoutes from './protected_routes/UserRoutes';
import Error from './pages/error/Error';
import ResetPassword from './pages/ResetPassword';


function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/reset/:token" element={<ResetPassword/>} />
        <Route element={<UserRoutes />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
