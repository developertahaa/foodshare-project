import React, { useState, useEffect } from 'react'
import { Users, Package, ClipboardList, Bell, Search, ChevronDown, LogOut, PieChart, BarChart2, Calendar, UserPlus, Coffee, ShoppingBag, Utensils, X } from 'lucide-react'
import Swal from 'sweetalert2';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [recentDonations, setRecentDonations] = useState([]);

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState("");
  const [volunteers, setVolunteers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedRequest, setSelectedRequest] = useState(null);

const [actionLogs, setActionLogs] = useState([]);
const [error, setError] = useState("");

useEffect(() => {
  const fetchActionLogs = async () => {
    try {
      const response = await fetch("http://localhost:5003/getActionLogs");
      if (!response.ok) throw new Error("Failed to fetch action logs.");
      const data = await response.json();
      setActionLogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchActionLogs();
}, []);


  const handleAssignVolunteerClick = (donation) => {
    setSelectedDonation(donation);
    setIsAssignModalOpen(true);
    console.log("Donation ID:", donation.donation_id);
};

useEffect(() => {
    const fetchVolunteers = async () => {
        fetch("http://localhost:5003/getVolunteers")
            .then((response) => response.json())
            .then((data) => setVolunteers(data))
            .catch((error) => console.error("Error fetching volunteers:", error));
    };

    fetchVolunteers();
}, []);

const handleConfirmAssignment = async () => {
    if (selectedDonation && selectedVolunteer) {
        console.log("Assigning Volunteer");
        console.log("Donation ID:", selectedDonation.donation_id);
        console.log("Volunteer ID:", selectedVolunteer);

        // Prepare the data to send
        const data = {
            volunteer_id: selectedVolunteer,
            donation_id: selectedDonation.donation_id,
        };

        try {
            // Sending a POST request to the URL with the data
            const response = await fetch('http://localhost:5003/saveAssignment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Handle response
            if (response.ok) {
                console.log("Assignment saved successfully");

                // Show success Swal alert
                Swal.fire({
                    title: 'Success!',
                    text: 'Volunteer assigned successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });

                // Optionally, close the modal after saving
                setIsAssignModalOpen(false);
            } else {
                console.log("Error saving assignment", response.statusText);
                // Show error Swal alert
                Swal.fire({
                    title: 'Error!',
                    text: `Failed to assign volunteer. Server response: ${response.statusText}`,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            console.error("Error occurred while assigning volunteer:", error);
            // Show error Swal alert
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while assigning volunteer. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Please select a volunteer.',
            icon: 'error',
            confirmButtonText: 'OK',
        });
    }
};


const [requests, setRequests] = useState([]);
const [loading, setLoading] = useState(true);

// Fetch data on component mount
useEffect(() => {
  const fetchRequests = async () => {
    try {
      const response = await fetch('http://localhost:5003/getRequests');
      if (response.ok) {
        const data = await response.json();
        setRequests(data);  // Set the fetched data in the state
      } else {
        console.error('Error fetching data:', response.statusText);
        // Optionally show an alert on error
        Swal.fire('Error', 'Failed to load requests.', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'An error occurred while fetching data.', 'error');
    } finally {
      setLoading(false);  // Stop loading spinner
    }
  };

  fetchRequests();
}, []);  // Empty dependency array ensures this runs only once on mount

  const [stats, setStats] = useState({
    totalVolunteers: 0,
    activeDonations: 0,
    pendingRequests: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5003/getDashboardStats")
      .then((response) => response.json())
      .then((data) => {
        setStats({
          totalVolunteers: data.total_volunteers || 0,
          activeDonations: data.total_donations || 0,
          pendingRequests: data.pending_requests || 0,
        });
      })
      .catch((error) => console.error("Error fetching stats:", error));
  }, []);

  const statCards = [
    {
      title: "Total Volunteers",
      value: stats.totalVolunteers,
      icon: Users,
      change: "2 New Registered.",
    },
    {
      title: "Active Donations",
      value: stats.activeDonations,
      icon: Package,
      change: "5 new",
    },
    {
      title: "Pending Requests",
      value: stats.pendingRequests,
      icon: ClipboardList,
      change: "7 high priority",
    },
  ];


  useEffect(() => {
    fetch("http://localhost:5003/getDonations")
      .then((response) => response.json())
      .then((data) => setRecentDonations(data))
      .catch((error) => console.error("Error fetching donations:", error));
  }, []);


  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-600">FoodShare Admin</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-green-100 rounded-full px-4 py-2">
                <img
                  src="/placeholder.svg?height=32&width=32"
                  alt="Admin"
                  className="h-8 w-8 rounded-full mr-2 border-2 border-green-500"
                />
                <span className="text-green-800 font-medium">Admin User</span>
                <ChevronDown className="h-4 w-4 ml-2 text-green-600" />
              </div>
             
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-8">
          <ul className="flex space-x-1 bg-green-100 rounded-lg p-1">
            {['overview', 'assign', 'requests'].map((tab) => (
              <li key={tab} className="flex-1">
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`w-full py-2 px-4 rounded-md transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-green-500 text-white shadow-md'
                      : 'text-green-700 hover:bg-green-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">{stat.title}</h3>
              <stat.icon className="h-8 w-8 text-green-100" />
            </div>
            <p className="text-4xl font-bold text-white">{stat.value}</p>
            <p className="text-green-100 mt-2">{stat.change}</p>
          </div>
        ))}
            </div>

            <div className="">
      <div className="overflow-x-auto bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-semibold mb-6 text-gray-700">Action Logs</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="py-3 px-4 border">ID</th>
                <th className="py-3 px-4 border">Table Name</th>
                <th className="py-3 px-4 border">Action Type</th>
                <th className="py-3 px-4 border">Old Data</th>
                <th className="py-3 px-4 border">New Data</th>
                <th className="py-3 px-4 border">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {actionLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 border">{log.id}</td>
                  <td className="py-4 px-4 border">{log.table_name}</td>
                  <td className="py-4 px-4 border">{log.action_type}</td>
                  <td className="py-4 px-4 border">
                    <pre>{log.old_data || "N/A"}</pre>
                  </td>
                  <td className="py-4 px-4 border">
                    <pre>{log.new_data || "N/A"}</pre>
                  </td>
                  <td className="py-4 px-4 border">{log.action_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
          </div>
        )}

{activeTab === "assign" && (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-green-200">
    <h3 className="text-2xl font-semibold mb-6 text-green-700">
      Assign Volunteers to Donations
    </h3>
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Search by donor or items..."
        />
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-green-500" />
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-green-700 border-b border-green-200">
            <th className="py-3 px-4">Donor</th>
            <th className="py-3 px-4">Items</th>
            <th className="py-3 px-4">Quantity</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Assign Volunteer</th>
          </tr>
        </thead>
        <tbody>
          {recentDonations.map((donation) => (
            <tr
              key={donation.id}
              className="border-b border-green-100 hover:bg-green-50 transition-colors"
            >
              <td className="py-4 px-4">{donation.donor_name}</td>
              <td className="py-4 px-4 flex items-center">
                {donation.items === "Non-perishables" && (
                  <ShoppingBag className="h-5 w-5 mr-2 text-green-500" />
                )}
                {donation.items === "Bread and Pastries" && (
                  <Coffee className="h-5 w-5 mr-2 text-green-500" />
                )}
                {donation.items === "Vegetables" && (
                  <Utensils className="h-5 w-5 mr-2 text-green-500" />
                )}
                {donation.food_item_name}
              </td>
              <td className="py-4 px-4">{donation.quantity}</td>
              <td className="py-4 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    donation.status === "Completed"
                      ? "bg-green-500 text-white"
                      : donation.status === "Assigned"
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {donation.status}
                </span>
              </td>
              <td className="py-4 px-4">
                <button
                  onClick={() => handleAssignVolunteerClick(donation)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center"
                >
                  Assign Volunteer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {isAssignModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Assign Volunteer</h2>
          <p className="mb-4 text-gray-700">
            Assigning volunteer for:{" "}
            <span className="font-semibold">
              {selectedDonation?.donor_name}
            </span>
          </p>
          <select
            value={selectedVolunteer}
            onChange={(e) => setSelectedVolunteer(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="">Select a volunteer</option>
            {volunteers.map((volunteer) => (
              <option key={volunteer.volunteer_id} value={volunteer.volunteer_id}>
                {volunteer.name}
              </option>
            ))}
          </select>
          <div className="flex justify-end">
            <button
              onClick={() => setIsAssignModalOpen(false)}
              className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmAssignment}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
)}


          {activeTab === 'requests' && (
            <div className="bg-white rounded-xl p-6 shadow-lg border border-green-200">
              <h3 className="text-2xl font-semibold mb-6 text-green-700">Check Food Requests</h3>
              <div className="overflow-x-auto">
              <table className="w-full">
          <thead>
            <tr className="text-left text-green-700 border-b border-green-200">
              <th className="py-3 px-4">Requester</th>
              <th className="py-3 px-4">Food Item</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Can Collect</th>
              <th className="py-3 px-4">Address</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request.id} className="border-b border-green-100 hover:bg-green-50 transition-colors">
                <td className="py-4 px-4">{request.name}</td>
                <td className="py-4 px-4">{request.food_item_name}</td>
                <td className="py-4 px-4">{request.quantity}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    request.status === 'Pending' ? 'bg-yellow-500 text-white' :
                    request.status === 'Fulfilled' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="py-4 px-4">{request.canCollect ? 'Yes' : 'No'}</td>
                <td className="py-4 px-4">{request.address}</td>
                <td className="py-4 px-4">
                <button
  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
  onClick={() => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  }}
>
  Review
</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
            </div>
          </div>
        )}
        {isModalOpen && selectedRequest && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl p-8 shadow-lg w-96">
      <h3 className="text-2xl font-semibold mb-4 text-green-700">Review Request</h3>
      <p><strong>Requester:</strong> {selectedRequest.name}</p>
      <p><strong>Food Item:</strong> {selectedRequest.food_item_name}</p>
      <p><strong>Quantity:</strong> {selectedRequest.quantity}</p>
      <div className="flex justify-end mt-6 space-x-4">
      <button
  className="bg-grey-300 text-black px-4 py-2 rounded-md border-black transition-colors"
  onClick={() => {
    setIsModalOpen(false); // Close the modal
  }}
>
  Cancel
</button>

<button
  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
  onClick={() => {
    const data = { request_id: selectedRequest.request_id, action: 0 }; // Reject action
    fetch('http://localhost:5003/updateRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Request ID: ${selectedRequest.request_id}, Action: Reject (0)`);
          return response.json();
        } else {
          throw new Error('Failed to update request.');
        }
      })
      .then((result) => {
        console.log('Server Response:', result);
        setIsModalOpen(false); // Close the modal
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }}
>
  Reject
</button>
<button
  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
  onClick={() => {
    const data = { request_id: selectedRequest.request_id, action: 1 }; // Accept action
    fetch('http://localhost:5003/updateRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Request ID: ${selectedRequest.request_id}, Action: Accept (1)`);
          return response.json();
        } else {
          throw new Error('Failed to update request.');
        }
      })
      .then((result) => {
        console.log('Server Response:', result);
        setIsModalOpen(false); // Close the modal
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }}
>
  Accept
</button>

      </div>
    </div>
  </div>
)}

      </main>
    </div>
    
    
  )
}