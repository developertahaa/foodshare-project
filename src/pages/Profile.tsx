import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, Gift, Utensils, Users, AlertCircle, Settings, X, LogOut, Lock, Mail, ChevronDown,PieChart } from 'lucide-react'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Profile() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "/placeholder.svg?height=128&width=128",
    joinDate: "January 2023",
    eventsAdded: 5,
    donationsMade: 12,
    volunteeredHours: 48
    
  }

  

  const [userData, setUserData] = useState({ name: '', created_at: '' });
    const email = sessionStorage.getItem('userEmail');
    const [activeModal, setActiveModal] = useState<string | null>(null)

    useEffect(() => {
        if (email) {
            axios.post('http://localhost:5009/get-user', { email })
                .then(response => setUserData(response.data))
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [email]);


  const events = [
    { id: 1, title: "Community Food Drive", date: "2023-06-15", time: "09:00 AM - 02:00 PM", location: "Central Park" },
    { id: 2, title: "Soup Kitchen Volunteers", date: "2023-06-20", time: "11:00 AM - 03:00 PM", location: "Downtown Community Center" },
    { id: 3, title: "Food Packaging Event", date: "2023-06-25", time: "10:00 AM - 04:00 PM", location: "City Convention Center" },
  ]

  const donations = [
    { id: 1, item: "Canned Goods", quantity: 50, date: "2023-05-10" },
    { id: 2, item: "Fresh Vegetables", quantity: 30, date: "2023-05-22" },
    { id: 3, item: "Rice", quantity: 100, date: "2023-06-05" },
  ]
  

  const handleChangeEmail = () => {
    setIsSettingsOpen(false)
    setIsEmailModalOpen(true)
  }

  const handleLogout = () => {
    setIsSettingsOpen(false)
    setIsLogoutModalOpen(true)
  }

  const handleSettingsClick = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }
  const handleChangePassword = async () => {
    setIsSettingsOpen(false);
    setIsPasswordModalOpen(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (newPassword !== confirmNewPassword) {
        setErrorMessage('New passwords do not match.');
        return;
    }

    // Get the email from sessionStorage
    const email = sessionStorage.getItem('userEmail'); // Ensure this key matches what you set when logging in

    try {
        const response = await fetch('http://localhost:5000/change', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                currentPassword,
                newPassword,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            setSuccessMessage(data.message);
            setIsPasswordModalOpen(false);
            Swal.fire({
              title: 'Success!',
              text: 'Password changed successfully!',
              icon: 'success',
              confirmButtonText: 'OK'
          });
        } else {
            const errorData = await response.json();
            setErrorMessage(errorData.message || 'An error occurred.');
        }
    } catch (error) {
        setErrorMessage('An error occurred while changing the password.');
    }
};



  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 relative">
    <div className="max-w-4xl mx-auto">
      <div className="relative mb-8">
        <div className="absolute top-0 right-0 mt-4 mr-4 z-10">
          <button
            onClick={handleSettingsClick}
            className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        {isSettingsOpen && (
          <div className="absolute top-16 right-0 w-64 bg-white rounded-lg shadow-xl z-50 animate-in fade-in slide-in-from-top-5 duration-300">
            <button
              className="w-full flex items-center px-4 py-3 hover:bg-gray-100 transition-colors duration-200"
              onClick={handleChangePassword}               >
              <Lock className="mr-2 h-5 w-5" />
              <span>Change Password</span>
            </button>
            <button
              className="w-full flex items-center px-4 py-3 hover:bg-gray-100 transition-colors duration-200"
              onClick={handleChangeEmail} 
            >
              <Mail className="mr-2 h-5 w-5" />
              <span>Change Email</span>
            </button>
            <button
              className="w-full flex items-center px-4 py-3 hover:bg-gray-100 transition-colors duration-200"
              onClick={handleLogout} 
              >
              <LogOut className="mr-2 h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        )}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-green-400 to-blue-500"></div>
          <div className="px-4 py-8">
            <div className="flex flex-col items-center -mt-24">
              <div className="h-32 w-32 rounded-full border-4 border-white bg-green-500 shadow-lg flex items-center justify-center">
                <span className="text-4xl font-bold text-white">{userData.name.charAt(0)}</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold text-gray-900">{userData.name}</h2>
              <p className="text-gray-600">Email: {email}</p>
            </div>
          </div>
        </div>
      </div>

        {/* Events Added */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Events Added</h2>
            <PieChart className="h-6 w-6 text-green-500" />
          </div>
          <ul className="divide-y divide-gray-200">
            {events.map((event) => (
              <li key={event.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition duration-150 ease-in-out">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Calendar className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-1" />
                    <p className="text-sm text-gray-500">{event.time}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                  {event.location}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Donations Made */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Donations Made</h2>
            <Gift className="h-6 w-6 text-blue-500" />
          </div>
          <ul className="divide-y divide-gray-200">
            {donations.map((donation) => (
              <li key={donation.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition duration-150 ease-in-out">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Utensils className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{donation.item}</p>
                      <p className="text-sm text-gray-500">Quantity: {donation.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-1" />
                    <p className="text-sm text-gray-500">{donation.date}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Requests Made */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Requests Made</h2>
            <Users className="h-6 w-6 text-purple-500" />
          </div>
          <div className="px-4 py-12 sm:px-6 flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-purple-100 p-3 mb-4">
              <AlertCircle className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Requests Made</h3>
            <p className="text-sm text-gray-500 max-w-md">
              You haven't made any requests yet. If you need assistance, don't hesitate to reach out to our community.
            </p>
            <button className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Make a Request
            </button>
          </div>
        </div>
      </div>

    {/* Change Password Modal */}
    {isPasswordModalOpen && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div className="mt-3 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Change Password</h3>
        <button onClick={() => setIsPasswordModalOpen(false)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
          &times; {/* Close icon */}
        </button>
      </div>
      <div className="mt-2 px-7 py-3">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="mb-3 px-3 py-2 border rounded-md w-full"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mb-3 px-3 py-2 border rounded-md w-full"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="mb-3 px-3 py-2 border rounded-md w-full"
        />
      </div>
      <div className="items-center px-4 py-3">
        <button
          onClick={handleChangePassword}
          className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Change Password
        </button>
      </div>
    </div>
  </div>
)}

{/* Change Email Modal */}
{isEmailModalOpen && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div className="mt-3 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Change Email</h3>
        <button
          onClick={() => setIsEmailModalOpen(false)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &times; {/* Close icon */}
        </button>
      </div>
      <div className="mt-2 px-7 py-3">
        <input type="email" placeholder="Current Email" value={email} disabled className="mb-3 px-3 py-2 border rounded-md w-full bg-gray-100" />
        <input type="email" placeholder="New Email" className="mb-3 px-3 py-2 border rounded-md w-full" />
        <input type="password" placeholder="Password" className="mb-3 px-3 py-2 border rounded-md w-full" />
      </div>
      <div className="items-center px-4 py-3">
        <button
          onClick={() => setIsEmailModalOpen(false)}
          className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Change Email
        </button>
      </div>
    </div>
  </div>
)}

{/* Logout Confirmation Modal */}
{isLogoutModalOpen && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div className="mt-3 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Confirm Logout</h3>
        <button
          onClick={() => setIsLogoutModalOpen(false)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &times; {/* Close icon */}
        </button>
      </div>
      <div className="mt-2 px-7 py-3">
        <p className="text-sm text-gray-500">
          Are you sure you want to logout?
        </p>
      </div>
      <div className="items-center px-4 py-3">
        <button
          onClick={() => setIsLogoutModalOpen(false)}
          className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Logout
        </button>
        <button
          onClick={() => setIsLogoutModalOpen(false)}
          className="mt-3 px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  )
}