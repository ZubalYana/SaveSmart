import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
// import AuthLayout from './components/Auth/AuthLayout';
// import Greeting from './components/Auth/Greeting';
// import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import ResetPassword from './components/Auth/ResetPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/auth/*" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
