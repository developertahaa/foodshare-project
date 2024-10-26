'use client'

import React, { useState } from 'react'
import { Search, X, MapPin, Clock, User, Utensils, Heart, ShoppingBag, PlusCircle, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Swal from 'sweetalert2'
import axios from 'axios'


interface FoodItem {
  id: number
  name: string
  description: string
  quantity: string
  location: string
  expirationDate: string
  donorName: string
  image: string
}

const initialFoodItems: FoodItem[] = [
  {
    id: 1,
    name: "Fresh Vegetables",
    description: "A mix of fresh vegetables including carrots, tomatoes, and lettuce.",
    quantity: "5 kg",
    location: "Downtown Community Center",
    expirationDate: "2023-05-30",
    donorName: "Local Farm Co-op",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    name: "Canned Soup",
    description: "Assorted flavors of canned soup.",
    quantity: "20 cans",
    location: "Food Bank on 5th Street",
    expirationDate: "2024-03-15",
    donorName: "GroceryMart",
    image: "https://images.unsplash.com/photo-1590189182193-1fd44f2b4048?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    name: "Bread",
    description: "Freshly baked whole wheat bread.",
    quantity: "10 loaves",
    location: "Bakery on Main St",
    expirationDate: "2023-05-25",
    donorName: "Sunshine Bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80"
  },
]

export default function HelpHome() {
  const [foodItems] = useState<FoodItem[]>(initialFoodItems)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null)
  const [formData, setFormData] = useState({
    donorName: '',
    donorAddress: '',
    donorContact: '',
    donationName: '',
    donationQuantity: '',
    donationLocation: '',
    donateAnonymously: false,
    scheduleDate: '',
    scheduleTime: '',
    isVolunteer: false,
    volunteerPhone: '',
  })

  const [requestFormData, setRequestFormData] = useState({
    name: '',
    address: '',
    canCollect: false,
    quantity: '',
    agreeToTerms: false,
  })

  const navigate = useNavigate(); // Initialize useNavigate

  // Check if session exists and redirect if not
  const userEmail = sessionStorage.getItem('userEmail'); // Check for user email in session storage
  if (!userEmail) {
    return (
      <div className='mt-4 mx-4'>
        <h2>You are not logged in</h2>
        <button onClick={() => navigate('/login')} style={{ padding: '10px', backgroundColor: '#10B981', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Go to Login
        </button>
      </div>
    ); // Return a button to login if no session exists
  }

  const locations = Array.from(new Set(foodItems.map(item => item.location)))

  const filteredItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedLocation === "" || item.location === selectedLocation)
  )

  const handleRequest = (item: FoodItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleRequestInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setRequestFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmitDonation = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = 'http://localhost:5009/submit'
      console.log('Submitting donation:', formData)
      
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000, // 5 seconds timeout
      })

      console.log('Server response:', response.data)

      if (response.status === 200) {
        Swal.fire({
          title: 'Donation Successful',
          text: 'Thank you for your generous donation!',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#10B981',
        })
      } else {
        throw new Error(`Unexpected response status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error occurred during donation submission:', error)
      let errorMessage = 'Failed to submit donation. Please try again later.'
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Server error response:', error.response.data)
          errorMessage = error.response.data.message || errorMessage
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request)
          errorMessage = 'No response from server. Please check your internet connection.'
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up request:', error.message)
        }
        console.error('Axios error config:', error.config)
      }

      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }

    // Reset form after submission
    setFormData({
      donorName: '',
      donorAddress: '',
      donorContact: '',
      donationName: '',
      donationQuantity: '',
      donationLocation: '',
      donateAnonymously: false,
      scheduleDate: '',
      scheduleTime: '',
      isVolunteer: false,
      volunteerPhone: '',
    })
    setIsDonateModalOpen(false)
  }

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!requestFormData.agreeToTerms) {
      Swal.fire({
        title: 'Error',
        text: 'You must agree to the terms of service.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return
    }
    // Here you would typically send the request to your backend
    console.log('Submitting request:', requestFormData)
    Swal.fire({
      title: 'Request Submitted',
      text: 'Your food request has been submitted successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#10B981',
    })
    setRequestFormData({
      name: '',
      address: '',
      canCollect: false,
      quantity: '',
      agreeToTerms: false,
    })
    setIsModalOpen(false)
  }


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-green-500 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h1 className="text-4xl font-bold mb-4">Find Available Food Donations</h1>
              <p className="text-xl">Browse and request food donations from generous community members.</p>
            </div>
              
            <button
                onClick={() => setIsDonateModalOpen(true)}
                className="bg-white text-green-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base flex items-center hover:bg-green-50 transition duration-300 shadow-md"
              >
                <PlusCircle className="mr-2" />
                Donate Food
              </button>
                        </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-green-800 flex items-center">
              <Search className="mr-2" /> Filters
            </h2>
            <div className="mb-4">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  className="w-full p-2 border rounded-md pl-8"
                  placeholder="Search food items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                id="location"
                className="w-full p-2 border rounded-md"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </aside>

          <main className="flex-1">
    
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-green-800">{item.name}</h3>
                    <p className="text-gray-600 mb-4">
                      {item.description.split(" ").length > 10
                        ? item.description.split(" ").slice(0, 10).join(" ") + "..."
                        : item.description}
                    </p>
                    <div className="flex items-center mb-2">
                      <MapPin className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-gray-700">{item.location}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-gray-700">Expires: {item.expirationDate}</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <User className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-gray-700">Donor: {item.donorName}</span>
                    </div>
                    <button
                      onClick={() => handleRequest(item)}
                      className="w-full flex items-center justify-center bg-green-600 text-white px-4 py-2 transition duration-300 ease-in-out hover:bg-green-700 rounded-md shadow-md"
                    >
                      <ShoppingBag className="mr-2" />
                      Request Food
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {isDonateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 landscape-modal">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-green-800">Donate Food</h2>
              <button onClick={() => setIsDonateModalOpen(false)}>
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleSubmitDonation}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center col-span-2">
                  <input
                    type="checkbox"
                    id="donateAnonymously"
                    name="donateAnonymously"
                    checked={formData.donateAnonymously}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="donateAnonymously" className="ml-2 text-sm font-medium text-gray-700">Donate Anonymously</label>
                </div>

                {formData.donateAnonymously && (
                  <div className="col-span-2 text-sm text-gray-600 mb-4">
                    Your name will be kept private and will not be shared with anyone.
                  </div>
                )}

                <div>
                  <label htmlFor="donorName" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    id="donorName" 
                    name="donorName"
                    value={formData.donorName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" 
                    required 
                  />
                </div>


                <div>
                  <label htmlFor="donorContact" className="block text-sm font-medium text-gray-700 mb-1">Your Contact Number</label>
                  <input 
                    type="tel" 
                    id="donorContact" 
                    name="donorContact"
                    value={formData.donorContact}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" 
                    required 
                  />
                </div>

                <div>
                  <label htmlFor="donationName" className="block text-sm font-medium text-gray-700 mb-1">Food Item Name</label>
                  <input 
                    type="text" 
                    id="donationName" 
                    name="donationName"
                    value={formData.donationName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" 
                    required 
                  />
                </div>

                <div>
                  <label htmlFor="donationQuantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input 
                    type="number" 
                    id="donationQuantity" 
                    name="donationQuantity"
                    value={formData.donationQuantity}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" 
                    required 
                  />
                </div>

                <div>
                  <label htmlFor="donationLocation" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input 
                    type="text" 
                    
                    id="donationLocation" 
                    name="donationLocation"
                    value={formData.donationLocation}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" 
                    required 
                  />
                </div>

                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="isVolunteer"
                    name="isVolunteer"
                    checked={formData.isVolunteer}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="isVolunteer" className="ml-2 text-sm font-medium text-gray-700">Would you like to volunteer?</label>
                </div>

                {formData.isVolunteer && (
                  <div>
                    <label htmlFor="volunteerPhone" className="block text-sm font-medium text-gray-700 mb-1">Your Phone Number</label>
                    <input 
                      type="tel" 
                      id="volunteerPhone" 
                      name="volunteerPhone"
                      value={formData.volunteerPhone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" 
                      required 
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="scheduleDate" className="block text-sm font-medium text-gray-700 mb-1">Schedule Date (optional)</label>
                  <input 
                    type="date" 
                    id="scheduleDate" 
                    name="scheduleDate"
                    value={formData.scheduleDate}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" 
                  />
                </div>

                <div>
                  <label htmlFor="scheduleTime" className="block text-sm font-medium text-gray-700 mb-1">Schedule Time (optional)</label>
                  <input 
                    type="time" 
                    id="scheduleTime" 
                    name="scheduleTime"
                    value={formData.scheduleTime}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" 
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-3 rounded-md shadow-md transition duration-300 ease-in-out hover:bg-green-700 mt-6"
              >
                Confirm
              </button>
            </form>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">Terms of Service</h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>All donations are voluntary and can be made anonymously.</li>
                <li>You are responsible for the delivery of donated food items.</li>
                <li>You can check more on <a href="#" className="text-green-600 hover:underline">terms & services</a>.</li>
              </ul>
            </div>
          </div>
        </div>
      )}


{isModalOpen && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-green-800">Request Food</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleSubmitRequest}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={requestFormData.name}
                    onChange={handleRequestInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Your Address</label>
                  <input 
                    type="text" 
                    id="address" 
                    name="address"
                    value={requestFormData.address}
                    onChange={handleRequestInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" 
                    required 
                  />
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="canCollect"
                    name="canCollect"
                    checked={requestFormData.canCollect}
                    onChange={handleRequestInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="canCollect" className="text-sm font-medium text-gray-700">I can collect the food myself</label>
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity Needed</label>
                  <input 
                    type="text" 
                    id="quantity" 
                    name="quantity"
                    value={requestFormData.quantity}
                    onChange={handleRequestInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" 
                    required 
                  />
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={requestFormData.agreeToTerms}
                    onChange={handleRequestInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="agreeToTerms" className="text-sm font-medium text-gray-700">I agree to the terms of service</label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-3 rounded-md shadow-md transition duration-300 ease-in-out hover:bg-green-700 mt-6"
              >
                Request
              </button>
            </form>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">Terms of Service</h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>You must use the food for personal consumption only.</li>
                <li>You agree to collect the food at the specified location and time.</li>
                <li>The food bank is not responsible for the quality or safety of the food.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}