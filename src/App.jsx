import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import AuthLayout from './components/Auth/AuthLayout/AuthLayout';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword';
import WhereDidYouHear from './components/Auth/WhereDidYouHear/WhereDidYouHear';
import PurposeOfUsage from './components/Auth/PurposeOfUsage/PurposeOfUsage';
import ThanksForRegistering from './components/Auth/ThanksForRegistering/ThanksForRegistering';
import ProtectedRoute from './components/ProtectedRoute';
import LayoutWithSidebar from './components/LayoutWithSidebar/LayoutWithSidebar'; 
import Budget from './components/Budget/Budget';
import Expenses from './components/Expenses/Expenses';
import Income from './components/Income/Income';
import Goals from './components/Goals/Goals';
import EmergencyFunds from './components/EmergencyFunds/EmergencyFunds';
import FinancialNews from './components/FinancialNews/FinancialNews';
import MyProfile from './components/MyProfile/MyProfile';
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<LayoutWithSidebar><Home /></LayoutWithSidebar>} />
          <Route path="/budget" element={<LayoutWithSidebar><Budget /></LayoutWithSidebar>} />
          <Route path="/income" element={<LayoutWithSidebar><Income /></LayoutWithSidebar>} />
          <Route path="/expenses" element={<LayoutWithSidebar><Expenses /></LayoutWithSidebar>} />
          <Route path="/goals" element={<LayoutWithSidebar><Goals /></LayoutWithSidebar>} />
          <Route path="/emergency-funds" element={<LayoutWithSidebar><EmergencyFunds /></LayoutWithSidebar>} />
          <Route path="/financial-news" element={<LayoutWithSidebar><FinancialNews /></LayoutWithSidebar>} />
          <Route path="/my-profile" element={<LayoutWithSidebar><MyProfile /></LayoutWithSidebar>} />
        </Route>

        {/* Auth routes ( no sidebar, remain public ) */}
        <Route path="/auth" element={<AuthLayout />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/register/where-did-you-hear" element={<WhereDidYouHear />} />
        <Route path="/auth/register/purpose-of-usage" element={<PurposeOfUsage />} />
        <Route path="/auth/register/registration-complete" element={<ThanksForRegistering />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
