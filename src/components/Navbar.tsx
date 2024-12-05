import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Gift, HandHeart, Users, Calendar, Handshake, HelpCircle, LogIn, LogOut, Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loadingWidth, setLoadingWidth] = useState(0); // State for loading line width
  const [showNotifications, setShowNotifications] = useState(false); // State for showing notifications
  const [notifications, setNotifications] = useState([]); // Notifications state

  useEffect(() => {
    const sessionId = sessionStorage.getItem('sessionId');
    const email = sessionStorage.getItem('userEmail');

    
    if (sessionId && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  console.log("new", userEmail);

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

  const toggleNotifications = async () => {
    setShowNotifications(!showNotifications); // Toggle notification window

    if (!showNotifications && userEmail) {
      try {
        // Send request to backend to fetch notifications for the user
        const response = await fetch('http://localhost:5003/getNotification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_email: userEmail }),
        });
        console.log(userEmail);

        if (response.ok) {
          const data = await response.json();
          setNotifications(data.notifications || []); // Assuming the response contains a 'notifications' field
        } else {
          console.error('Failed to fetch notifications');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    }
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
            {isLoggedIn && <NavLink to="/volunteer" icon={<Users className="h-4 w-4" />} onClick={handleNavLinkClick}>Volunteer with us</NavLink>}
            <NavLink to="/partnership" icon={<Handshake className="h-4 w-4" />} onClick={handleNavLinkClick}>Partner With Us</NavLink>
            <NavLink to="/faq" icon={<HelpCircle className="h-4 w-4" />} onClick={handleNavLinkClick}>FAQs</NavLink>
          </div>

          <div className="flex items-center ml-auto">
            {isLoggedIn ? (
              <>
                <LogoutButton icon={<LogOut className="h-4 w-4 mr-1" />} onClick={handleLogout}>Logout</LogoutButton>
                <Link
  to="/profile"
  className="w-8 h-8 bg-white z-1 rounded-full flex items-center justify-center text-xs font-bold ml-2 transition-colors duration-200"
  aria-label="Profile"
>
  {userEmail ? <span style={{ color: '#16A34A' }}>{userEmail.charAt(0).toUpperCase()}</span> : 'N/A'}
</Link>




                {/* Notification Icon */}
                <button
                  onClick={toggleNotifications}
                  className="relative ml-3 text-white hover:text-green-200"
                  aria-label="Notifications"
                >
                  <Bell className="h-6 w-6" />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-600 rounded-full"></span>
                  )}
                </button>

                {/* Notification Window */}
                {showNotifications && (
                  <div className="absolute right-0 mt-80 w-80 bg-white text-black rounded-lg shadow-lg p-4 max-h-60 overflow-y-auto z-50 transition-opacity duration-500 opacity-100">
                    <h3 className="font-semibold text-lg">Notifications</h3>
                    <div className="mt-4 space-y-2">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-2 bg-${notification.status === 'Unread' ? 'red-100' : notification.status === 'Read' ? 'green-100' : 'blue-100'} rounded-md flex items-start space-x-3`}
                        >
                          {notification.status === 'Read' && <CheckCircle className="h-5 w-5 text-green-500" />}
                          {notification.status === 'Unread' && <AlertCircle className="h-5 w-5 text-red-500" />}
                          {notification.status === '' && <Info className="h-5 w-5 text-blue-500" />}
                          <p className="text-sm">{notification.message} - {notification.status}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
