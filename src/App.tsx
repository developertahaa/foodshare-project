import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/HomePage';
import Donate from './pages/Donatenow';
import AskHelp from './pages/Askhelp';
import LoginSignup from './pages/Login';
import Volunteer from './pages/Volunteernow';
import HelpHome from './pages/Helphome';
import Events from './pages/Events';
import Profile from './pages/Profile';
import Partnership from './pages/Partnership';
import AdminProfile from './pages/AdminProfile';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Tos from './pages/Tos';
import Faqs from './pages/faq';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/ask-help" element={<AskHelp />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/events" element={<Events />} />
            <Route path="/helphome" element={<HelpHome />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/partnership" element={<Partnership />} />
            <Route path="/faq" element={<Faqs />} />
            <Route path="/Tos" element={<Tos />} />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/AdminProfile" element={<AdminProfile />} />



          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
