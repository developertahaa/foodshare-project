import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, Gift, Utensils, Users, AlertCircle, Settings, X, LogOut, Edit, Lock, Mail, ChevronDown,PieChart,Heart, Trophy, HandHelping, CheckCircle, XCircle } from 'lucide-react'
import axios from 'axios';
import Swal from 'sweetalert2';

type FoodItem = {
  id: string;
  name: string;
  donorName: string;
  quantity: number;
  location: string;
  expirationDate: string;
  isAnonymous: boolean;
  status: string;
  image: string;
};

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

  const [volunteerId, setVolunteerId] = useState(null); // To store the volunteer_id or false

  useEffect(() => {
    const checkIfVolunteer = async () => {
      try {
        const response = await fetch('http://localhost:5003/isVolunteer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_email: sessionStorage.getItem('userEmail'),
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data); // Logs the response, either { volunteer_id: 123 } or { volunteer_id: false }

        // Update the state based on the response
        if (data.volunteer_id) {
          setVolunteerId(data.volunteer_id); // Set volunteer_id if found
        } else {
          setVolunteerId(false); // Set false if no volunteer found
        }
      } catch (error) {
        console.error('Error fetching volunteer data:', error);
      }
    };

    checkIfVolunteer(); // Call the async function

  }, []); 

  //check for admin
  const [adminId, setadminId] = useState(null); // To store the volunteer_id or false

  useEffect(() => {
    const checkIfAdmin = async () => {
      try {
        const response = await fetch('http://localhost:5003/isAdmin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_email: sessionStorage.getItem('userEmail'),
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data); // Logs the response, either { volunteer_id: 123 } or { volunteer_id: false }
        if (data.user_id) {
          setadminId(data.user_id); // Set volunteer_id if found
        } else {
          setadminId(false); // Set false if no volunteer found
        }
      } catch (error) {
        console.error('Error fetching volunteer data:', error);
      }
    };

    checkIfAdmin(); // Call the async function

  }, []);

  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "/placeholder.svg?height=128&width=128",
    joinDate: "January 2023",
    eventsAdded: 5,
    donationsMade: 12,
    volunteeredHours: 48
    
  }


  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');
  const user_email = sessionStorage.getItem('userEmail'); // Retrieve user email from session

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:5003/getUserRequests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_email }),
        });

        const data = await response.json();

        if (data.requests && data.requests.length > 0) {
          setRequests(data.requests);
        } else {
          setMessage(data.message || 'No Requests Made');
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
        setMessage('Error fetching requests');
      }
    };

    if (user_email) {
      fetchRequests();
    }
  }, [user_email]);

  const [donations, setDonations] = useState<FoodItem[]>([]);

  useEffect(() => {
    // Fetch the donations from the backend
    fetch('http://localhost:5003/donationProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_email: sessionStorage.getItem('userEmail') }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Assuming data.donations is an array of donations
        const transformedItems: FoodItem[] = data.donations.map((donation: any) => ({
          id: donation.donation_id,
          name: donation.food_item_name,
          donorName: donation.donor_name,  // Example: You can use a more detailed description if needed
          quantity: donation.quantity,
          location: donation.donationLocation,
          expirationDate: donation.date_of_donation,
          isAnonymous: donation.isAnonymous,
          status: donation.status,
          image: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with actual image URL if available
        }));

        setDonations(transformedItems); // Store the transformed donations in state
      })
      .catch((error) => {
        console.error('Error fetching donations:', error);
        // Optionally, you can handle the error by showing a user-friendly message
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  
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
  const handleUpdateInterest = () => {
    console.log('Update Area of Interest clicked');
  };
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
                onClick={handleChangePassword}
              >
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
                  <span className="text-4xl font-bold text-white">{email.charAt(0)}</span>
                </div>
                <h2 className="mt-4 text-3xl font-bold text-gray-900">{userData.name}</h2>
                <p className="text-gray-600">Email: {email}</p>
                {volunteerId && (
                  <p className="mt-2 text-gray-600">Volunteer ID: {volunteerId}</p>
                )}
              </div>
            </div>
          </div>
        </div>


        <div className="max-w-4xl mx-auto">
        <div className="relative mb-8">
          {volunteerId && (
            <div className="mt-12 bg-white shadow-xl rounded-xl p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">You're Our most Valued Volunteer</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <Heart className="text-red-500 mr-4 h-10 w-10" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Make a Difference</h4>
                    <p className="text-gray-600 text-sm">Your actions will have a lasting impact on others.</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <HandHelping className="text-green-500 mr-4 h-10 w-10" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Give Back to the Community</h4>
                    <p className="text-gray-600 text-sm">Support those in need and strengthen your community.</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Trophy className="text-yellow-500 mr-4 h-10 w-10" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Grow Your Skills</h4>
                    <p className="text-gray-600 text-sm">Gain valuable experience and build your resume.</p>
                  </div>
                </div>
              </div>
              </div>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
  <div className="relative mb-8">
    {adminId && (
      <div className="mt-12 bg-white shadow-xl rounded-xl p-6">
        <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Admin Features & Authorities
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Manage Donations */}
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="text-green-500 h-16 w-16 mb-4" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Manage Donations</h4>
            <p className="text-gray-600 text-sm">
              View, track, and approve donations to ensure effective distribution.
            </p>
          </div>

          {/* Assign Volunteers */}
          <div className="flex flex-col items-center text-center">
            <Users className="text-blue-500 h-16 w-16 mb-4" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Assign Volunteers</h4>
            <p className="text-gray-600 text-sm">
              Assign tasks to volunteers and monitor their progress.
            </p>
          </div>

          {/* Update Information */}
          <div className="flex flex-col items-center text-center">
            <Edit className="text-yellow-500 h-16 w-16 mb-4" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Update Information</h4>
            <p className="text-gray-600 text-sm">
              Edit and maintain accurate records in the system.
            </p>
          </div>

          {/* Manage System */}
          <div className="flex flex-col items-center text-center">
            <Settings className="text-gray-700 h-16 w-16 mb-4" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Manage System</h4>
            <p className="text-gray-600 text-sm">
              Oversee all operations and ensure smooth functioning of the system.
            </p>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
        <button
      onClick={() => (window.location.href = '/AdminProfile')}
      className="px-4 py-2 border border-transparent text-l font-medium rounded-md text-white bg-green-500 shadow-lg hover:bg-green-600 transition duration-300"
    >
      Explore
    </button>
        </div>
      </div>
    )}
  </div>
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
                  <p className="text-sm font-medium text-gray-900">{donation.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {donation.quantity}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-1" />
                <p className="text-sm text-gray-500">{new Date(donation.expirationDate).toLocaleDateString()}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>

    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Requests Made</h2>
        <Users className="h-6 w-6 text-purple-500" />
      </div>

      {requests.length === 0 ? (
        <div className="px-4 py-12 sm:px-6 flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-purple-100 p-3 mb-4">
            <AlertCircle className="h-8 w-8 text-purple-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
          <p className="text-sm text-gray-500 max-w-md">
            You haven't made any requests yet. If you need assistance, don't hesitate to reach out to our community.
          </p>
          <button className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            Make a Request
          </button>
        </div>
      ) : (
        <div className="px-4 py-12 sm:px-6">
          {requests.map((request) => (
            <div key={request.id} className="border-b border-gray-200 py-4">
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-gray" />
                <h3 className="text-sm font-semibold text-gray-800">Request Made by: {request.name}</h3>
                <p className="text-sm text-gray-400">({request.user_email})</p>
              </div>
              <div className="mt-2 flex items-center space-x-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  Requested {request.quantity} packs of {request.food_item_name}
                </h3>
              </div>
              <div className="mt-2 flex items-center space-x-3">
                {request.status === 'Fulfilled' ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : request.status === 'Pending' ? (
                  <XCircle className="h-6 w-6 text-yellow-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
                <p className="text-sm text-gray-400">Status: {request.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
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