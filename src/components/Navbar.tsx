import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Gift, HandHeart, Users, Calendar, Handshake, HelpCircle, LogIn, LogOut } from 'lucide-react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loadingWidth, setLoadingWidth] = useState(0); // State for loading line width

  useEffect(() => {
    const sessionId = sessionStorage.getItem('sessionId');
    const email = sessionStorage.getItem('userEmail');
    if (sessionId && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('sessionId');
    sessionStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleNavLinkClick = () => {
    setLoadingWidth(100); // Start loading animation
    setTimeout(() => {
      setLoadingWidth(0); // Reset after animation duration
    }, 500); // Duration matches the CSS transition
  };

  return (
    <nav className="bg-green-600 text-white sticky top-0 z-50 shadow-md navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl flex items-center space-x-2 transition-transform transform hover:scale-105">
            <HandHeart className="h-6 w-6" />
            <span>FoodShare</span>
          </Link>

          <div className="hidden md:flex flex-grow justify-center">
            <NavLink to="/" icon={<Home className="h-4 w-4" />} onClick={handleNavLinkClick}>Home</NavLink>
            <NavLink to="/donate" icon={<Gift className="h-4 w-4" />} onClick={handleNavLinkClick}>Donate</NavLink>
            <NavLink to="/ask-help" icon={<HandHeart className="h-4 w-4" />} onClick={handleNavLinkClick}>Ask for Help</NavLink>
            <NavLink to="/volunteer" icon={<Users className="h-4 w-4" />} onClick={handleNavLinkClick}>Volunteer</NavLink>
            <NavLink to="/partnership" icon={<Handshake className="h-4 w-4" />} onClick={handleNavLinkClick}>Partner With Us</NavLink>
            <NavLink to="/faq" icon={<HelpCircle className="h-4 w-4" />} onClick={handleNavLinkClick}>FAQs</NavLink>
            {isLoggedIn && <NavLink to="/events" icon={<Calendar className="h-4 w-4" />} onClick={handleNavLinkClick}>Events</NavLink>}
          </div>

          <div className="flex items-center ml-auto">
            {isLoggedIn ? (
              <>
                <LogoutButton icon={<LogOut className="h-4 w-4 mr-1" />} onClick={handleLogout}>Logout</LogoutButton>
                <Link
                  to="/profile"
                  className="w-8 h-8 bg-white text-green-600 rounded-full flex items-center justify-center text-xs font-bold ml-2 transition-colors duration-200"
                  aria-label="Profile"
                >
                  {userEmail ? userEmail.charAt(0).toUpperCase() : ''}
                </Link>
              </>
            ) : (
              <LoginButton to="/login" icon={<LogIn className="h-4 w-4 mr-1" />}>Login</LoginButton>
            )}
          </div>
        </div>
        {/* Loading line */}
        <div className="loading-line" style={{ width: `${loadingWidth}%` }} />
      </div>
    </nav>
  );
}

function NavLink({ to, children, icon, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick} // Attach click handler
      aria-label={children.toString()}
      className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors duration-200"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

function LoginButton({ to, children, icon }) {
  return (
    <Link
      to={to}
      className="login px-4 py-2 rounded-md text-sm font-medium flex items-center"
      aria-label="Login"
    >
      {icon}
      {children}
    </Link>
  );
}

function LogoutButton({ onClick, children, icon }) {
  return (
    <button
      onClick={onClick}
      className="bg-white text-green-600 hover:bg-green-100 px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
      aria-label="Logout"
    >
      {icon}
      {children}
    </button>
  );
}
