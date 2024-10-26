import React, { useState, useCallback } from 'react'
import { Search, Calendar, MapPin, Users, Clock, X, Plus, Upload, Tag, Info, Filter, Phone } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  volunteersNeeded: number
  image: string
  category: string
  organizer: string
  contactEmail: string
  contactNumber: string
}

const initialEvents: Event[] = [
  {
    id: 1,
    title: "Community Food Drive",
    description: "Help collect and distribute food to families in need.",
    date: "2023-06-15",
    time: "09:00 AM - 02:00 PM",
    location: "Central Park",
    volunteersNeeded: 20,
    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=300&q=80",
    category: "Food Drive",
    organizer: "Local Charity Org",
    contactEmail: "contact@localcharity.org",
    contactNumber: "+1 (555) 123-4567"
  },
  {
    id: 2,
    title: "Soup Kitchen Volunteers",
    description: "Assist in preparing and serving meals at our local soup kitchen.",
    date: "2023-06-20",
    time: "11:00 AM - 03:00 PM",
    location: "Downtown Community Center",
    volunteersNeeded: 15,
    image: "https://images.unsplash.com/photo-1541802645635-11f2286a7482?auto=format&fit=crop&w=300&q=80",
    category: "Meal Service",
    organizer: "City Soup Kitchen",
    contactEmail: "info@citysoupkitchen.org",
    contactNumber: "+1 (555) 987-6543"
  },
  {
    id: 3,
    title: "Food Packaging Event",
    description: "Package meals for distribution to local food banks and shelters.",
    date: "2023-06-25",
    time: "10:00 AM - 04:00 PM",
    location: "City Convention Center",
    volunteersNeeded: 50,
    image: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?auto=format&fit=crop&w=300&q=80",
    category: "Food Packaging",
    organizer: "Meals for All",
    contactEmail: "events@mealsforall.org",
    contactNumber: "+1 (555) 246-8135"
  },
]

export default function Events() {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [signUpFormData, setSignUpFormData] = useState({
    name: '',
    address: '',
    phone: '',
    acceptTos: false
  })
  const [newEventData, setNewEventData] = useState<Omit<Event, 'id'>>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    volunteersNeeded: 0,
    image: '',
    category: '',
    organizer: '',
    contactEmail: '',
    contactNumber: ''
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const categories = Array.from(new Set(events.map(event => event.category)))

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "" || event.category === selectedCategory) &&
    (selectedDate === "" || event.date === selectedDate)
  )

  const handleSignUp = (event: Event) => {
    setSelectedEvent(event)
    setIsSignUpModalOpen(true)
  }

  const handleSignUpInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setSignUpFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Sign Up Form submitted:', signUpFormData)
    setIsSignUpModalOpen(false)
    setSignUpFormData({ name: '', address: '', phone: '', acceptTos: false })
    alert('Thank you for signing up!')
  }

  const handleAddEventInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewEventData(prev => ({
      ...prev,
      [name]: name === 'volunteersNeeded' ? parseInt(value) : value
    }))
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()
    reader.onload = () => {
      setNewEventData(prev => ({
        ...prev,
        image: reader.result as string
      }))
    }
    reader.readAsDataURL(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newEvent: Event = {
      id: events.length + 1,
      ...newEventData
    }
    setEvents(prev => [...prev, newEvent])
    setIsAddEventModalOpen(false)
    setNewEventData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      volunteersNeeded: 0,
      image: '',
      category: '',
      organizer: '',
      contactEmail: '',
      contactNumber: ''
    })
    alert('New event added successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">Upcoming Events</h1>
            <p className="text-base sm:text-xl">Join us in making a difference in our community.</p>
          </div>
          <button
            onClick={() => setIsAddEventModalOpen(true)}
            className="bg-white text-green-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base flex items-center hover:bg-green-50 transition duration-300 shadow-md"
          >
            <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Add Event
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="sm:hidden bg-green-100 text-green-600 p-2 rounded-full"
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>
          <div className={`sm:flex flex-wrap items-center gap-4 ${isFilterOpen ? 'block' : 'hidden sm:flex'}`}>
            <div className="flex-1 min-w-[200px] mb-4 sm:mb-0">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Events</label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  className="w-full p-2 pl-8 border rounded-full text-sm"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="flex-1 min-w-[200px] mb-4 sm:mb-0">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                id="category"
                className="w-full p-2 border rounded-full text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                id="date"
                className="w-full p-2 border rounded-full text-sm"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-green-700">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                <div className="flex items-center mb-2">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-700">{event.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-700">{event.time}</span>
                </div>
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-700">{event.location}</span>
                </div>
                <div className="flex items-center mb-4">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-700">Volunteers Needed: {event.volunteersNeeded}</span>
                </div>
                <button 
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-full text-sm transition duration-300 ease-in-out hover:bg-green-700 flex items-center justify-center"
                  onClick={() => handleSignUp(event)}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Sign Up
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sign Up Modal */}
      {isSignUpModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-green-700">Sign Up for {selectedEvent.title}</h2>
              <button onClick={() => setIsSignUpModalOpen(false)} className="text-gray-500 hover:text-green-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSignUpSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full p-2 border rounded-full text-sm"
                  value={signUpFormData.name}
                  onChange={handleSignUpInputChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows={3}
                  className="w-full p-2 border rounded-lg text-sm"
                  
                  value={signUpFormData.address}
                  onChange={handleSignUpInputChange}
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full p-2 border rounded-full text-sm"
                  value={signUpFormData.phone}
                  onChange={handleSignUpInputChange}
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="acceptTos"
                  name="acceptTos"
                  required
                  className="mr-2"
                  checked={signUpFormData.acceptTos}
                  onChange={handleSignUpInputChange}
                />
                <label htmlFor="acceptTos" className="text-sm text-gray-700">
                  I accept the terms of service for volunteers
                </label>
              </div>
              <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded-full text-sm transition duration-300 ease-in-out hover:bg-green-700">
                Confirm
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {isAddEventModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-green-700">Add New Event</h2>
              <button onClick={() => setIsAddEventModalOpen(false)} className="text-gray-500 hover:text-green-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAddEventSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="w-full p-2 border rounded-full text-sm"
                  value={newEventData.title}
                  onChange={handleAddEventInputChange}
                />
              </div>
              <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  required
                  className="w-full p-2 border rounded-full text-sm"
                  value={newEventData.contactNumber}
                  onChange={handleAddEventInputChange}
                />
                <p className="text-xs text-gray-500 mt-1">Your phone number will be kept private.</p>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={3}
                  className="w-full p-2 border rounded-lg text-sm"
                  value={newEventData.description}
                  onChange={handleAddEventInputChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  className="w-full p-2 border rounded-full text-sm"
                  value={newEventData.date}
                  onChange={handleAddEventInputChange}
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="text"
                  id="time"
                  name="time"
                  required
                  className="w-full p-2 border rounded-full text-sm"
                  value={newEventData.time}
                  onChange={handleAddEventInputChange}
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  className="w-full p-2 border rounded-full text-sm"
                  value={newEventData.location}
                  onChange={handleAddEventInputChange}
                />
              </div>
              <div>
                <label htmlFor="volunteersNeeded" className="block text-sm font-medium text-gray-700 mb-1">Volunteers Needed</label>
                <input
                  type="number"
                  id="volunteersNeeded"
                  name="volunteersNeeded"
                  required
                  className="w-full p-2 border rounded-full text-sm"
                  value={newEventData.volunteersNeeded}
                  onChange={handleAddEventInputChange}
                />
              </div>
              <div>
                <label htmlFor="organizer" className="block text-sm font-medium text-gray-700 mb-1">Organizer</label>
                <input
                  type="text"
                  id="organizer"
                  name="organizer"
                  required
                  className="w-full p-2 border rounded-full text-sm"
                  value={newEventData.organizer}
                  onChange={handleAddEventInputChange}
                />
              </div>
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  required
                  className="w-full p-2 border rounded-full text-sm"
                  value={newEventData.contactEmail}
                  onChange={handleAddEventInputChange}
                />
              </div>
              <div>
               
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
                <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer">
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p className="text-sm">Drop the image here ...</p>
                  ) : (
                    <p className="text-sm">Drag 'n' drop an image here, or click to select an image</p>
                  )}
                  {newEventData.image && <img src={newEventData.image} alt="Preview" className="mt-4 mx-auto max-h-40" />}
                </div>
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded-full text-sm transition duration-300 ease-in-out hover:bg-green-700 flex items-center justify-center">
                  <Plus className="mr-2 h-4 w-4" /> Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}