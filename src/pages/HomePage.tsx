import React, { useState, useEffect } from 'react'
import { Gift, Users, Heart, Bell, Calendar, MapPin, Clock, ArrowRight, Box, Utensils, Truck, Building, Globe, Lock, AlertTriangle, UserX, DollarSign } from 'lucide-react'

const donationItems = [
  { name: 'vegetables', unit: 'bags', icon: '🥕' },
  { name: 'rice', unit: 'kg', icon: '🍚' },
  { name: 'fruits', unit: 'boxes', icon: '🍎' },
  { name: 'canned goods', unit: 'cans', icon: '🥫' },
  { name: 'bread', unit: 'loaves', icon: '🍞' },
]

const donationCards = [
  { image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=300&q=80', title: 'Fresh Vegetables', text: 'Donated by Local Farm', details: '50 kg of assorted vegetables' },
  { image: 'https://images.unsplash.com/photo-1577003833619-76bbd7f82948?auto=format&fit=crop&w=300&q=80', title: 'Canned Goods', text: 'Donated by Supermarket Chain', details: '100 cans of various items' },
  { image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80', title: 'Rice Bags', text: 'Donated by Community Group', details: '200 kg of rice' },
  { image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=300&q=80', title: 'Fruit Baskets', text: 'Donated by Orchard', details: '30 baskets of fresh fruits' },
  { image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80', title: 'Bread', text: 'Donated by Local Bakery', details: '100 loaves of bread' },
]

const events = [
  { title: 'Community Food Drive', date: '2023-06-15', time: '09:00 AM - 02:00 PM', location: 'Central Park' },
  { title: 'Soup Kitchen Volunteers', date: '2023-06-20', time: '11:00 AM - 03:00 PM', location: 'Downtown Community Center' },
  { title: 'Food Packaging Event', date: '2023-06-25', time: '10:00 AM - 04:00 PM', location: 'City Convention Center' },
]

const partnershipTypes = [
  { title: 'Food Catering', icon: Utensils, description: 'Partner with us to provide meals for our events and distribution centers.' },
  { title: 'Grocery Stores', icon: Building, description: 'Donate surplus food items to support our cause and reduce waste.' },
  { title: 'Logistics Companies', icon: Truck, description: 'Help us transport food donations to where they are needed most.' },
  { title: 'Corporate Sponsors', icon: Globe, description: 'Support our mission through financial contributions and employee volunteering.' },
]

export default function Home() {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastIcon, setToastIcon] = useState('')
  const [cardIndex, setCardIndex] = useState(0)

  useEffect(() => {
    const toastInterval = setInterval(() => {
      const randomItem = donationItems[Math.floor(Math.random() * donationItems.length)]
      const amount = Math.floor(Math.random() * 50) + 10
      setToastMessage(`Someone just donated ${amount} ${randomItem.unit} of ${randomItem.name}!`)
      setToastIcon(randomItem.icon)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 5000)
    }, 10000)

    const slideInterval = setInterval(() => {
      setCardIndex((prevIndex) => (prevIndex + 1) % donationCards.length)
    }, 3000)

    return () => {
      clearInterval(toastInterval)
      clearInterval(slideInterval)
    }
  }, [])

  const getVisibleCards = () => {
    const cards = []
    for (let i = -2; i <= 2; i++) {
      cards.push(donationCards[(cardIndex + i + donationCards.length) % donationCards.length])
    }
    return cards
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="flex flex-col items-center justify-center text-center mt-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Share Your Blessings</span>
            <span className="block text-green-600">Feed the Hungry</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Join our mission to fight hunger and spread kindness in our community. Every donation, no matter how small, can make a big difference.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <a href="/donate" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:text-lg mr-4">
              <Gift className="mr-2 h-5 w-5" /> Donate Now
            </a>
            <a href="/volunteer" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-50 md:text-lg">
              <Users className="mr-2 h-5 w-5" /> Volunteer
            </a>
          </div>
        </div>

        

        {/* Donation cards carousel */}
        <div className="mt-16 relative h-96 overflow-hidden">
          <div className="flex justify-center items-center absolute inset-0">
            {getVisibleCards().map((card, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out absolute ${
                  index === 2 ? 'w-64 h-80 z-10' : 'w-60 h-64 opacity-70'
                }`}
                style={{
                  transform: `translateX(${(index - 2) * 120}%) scale(${index === 2 ? 1 : 0.8})`,
                }}
              >
                <img src={card.image} alt={card.title} className="w-full h-1/2 object-cover" />
                <div className="p-4">
                  <h3 className={`font-semibold ${index === 2 ? 'text-lg' : 'text-base'}`}>{card.title}</h3>
                  <p className={`text-gray-600 ${index === 2 ? 'text-sm' : 'text-xs'}`}>{card.text}</p>
                  <p className={`text-gray-500 mt-1 ${index === 2 ? 'text-xs' : 'text-xxs'}`}>{card.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>



        {/* How We Distribute Food section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                <Lock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Secure Login</h3>
              <p className="text-gray-600">Log in to your account or create a new one with enhanced privacy options.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Request Assistance</h3>
              <p className="text-gray-600">Submit your request for help, providing as much or as little information as you're comfortable sharing.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-yellow-100 rounded-full p-4 inline-block mb-4">
                <Heart className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Receive Support</h3>
              <p className="text-gray-600">Our team will review your request and connect you with the appropriate resources and assistance.</p>
            </div>
          </div>
        </div>


        <div className="mb-12 mt-16">
              <h3 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                The Reality of Hunger: Global Statistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-lg text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <Utensils className="h-12 w-12 opacity-80" />
                    <p className="text-4xl font-bold">690M</p>
                  </div>
                  <p className="text-lg">people go to bed hungry each night</p>
                  <div className="mt-4 h-2 bg-white bg-opacity-30 rounded-full">
                    <div className="h-full bg-white rounded-full" style={{width: '69%'}}></div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-lg text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <UserX className="h-12 w-12 opacity-80" />
                    <p className="text-4xl font-bold">3.1M</p>
                  </div>
                  <p className="text-lg">children die from undernutrition each year</p>
                  <div className="mt-4 h-2 bg-white bg-opacity-30 rounded-full">
                    <div className="h-full bg-white rounded-full" style={{width: '31%'}}></div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-lg text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <Globe className="h-12 w-12 opacity-80" />
                    <p className="text-4xl font-bold">1 in 9</p>
                  </div>
                  <p className="text-lg">people do not have enough food to lead a healthy life</p>
                  <div className="mt-4 h-2 bg-white bg-opacity-30 rounded-full">
                    <div className="h-full bg-white rounded-full" style={{width: '11.11%'}}></div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="h-12 w-12 opacity-80" />
                    <p className="text-4xl font-bold">4 Meals</p>
                  </div>
                  <p className="text-lg">can be provided with just Rs. 200 donation</p>
                  <div className="mt-4 h-2 bg-white bg-opacity-30 rounded-full">
                    <div className="h-full bg-white rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4 text-center">Source: United Nations World Food Programme, 2021</p>
            </div>


        {/* Upcoming Events section */}
        <div className="mt-16">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {events.map((event, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">{event.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">{event.time}</span>
                </div>
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">{event.location}</span>
                </div>
                <a
                  href="#"
                  className="inline-block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-600 bg-green-100 hover:bg-green-200"
                >
                  Login to View
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="/events"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              View All Events <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>

        {/* How Volunteers Work section */}
        <div className="mt-16">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            How Volunteers Work
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white rounded-lg shadow-md p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10">
                <Box className="w-32 h-32 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 relative z-10">Food Collection</h3>
              <p className="text-gray-600 relative z-10">Volunteers help collect food donations from various locations and events.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10">
                <Utensils className="w-32 h-32 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 relative z-10">Food Sorting</h3>
              <p className="text-gray-600 relative z-10">Volunteers sort and package food items for efficient distribution.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10">
                <Truck className="w-32 h-32 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 relative z-10">Food Distribution</h3>
              <p className="text-gray-600 relative z-10">Volunteers assist in distributing food to those in need at various locations.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <a
              href="/volunteer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Become a Volunteer <Users className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Partnership section */}
        <div className="mt-16">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            Partner With Us
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {partnershipTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <type.icon className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold  mb-2">{type.title}</h3>
                <p className="text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="/partnership"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Become a Partner <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Cities We Serve section */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 z-0">
            <svg className="w-full h-full opacity-10" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
              <path d="M500,10C229.4,10,10,229.4,10,500s219.4,490,490,490s490-219.4,490-490S770.6,10,500,10z M500,960
                C252.3,960,50,757.7,50,510S252.3,60,500,60s450,202.3,450,450S747.7,960,500,960z"/>
              <path d="M500,100c-225.5,0-408,182.5-408,408s182.5,408,408,408s408-182.5,408-408S725.5,100,500,100z M500,880
                c-205.4,0-372-166.6-372-372s166.6-372,372-372s372,166.6,372,372S705.4,880,500,880z"/>
              <path d="M500,200c-165.7,0-300,134.3-300,300s134.3,300,300,300s300-134.3,300-300S665.7,200,500,200z M500,760
                c-143.9,0-260-116.1-260-260s116.1-260,260-260s260,116.1,260,260S643.9,760,500,760z"/>
            </svg>
            
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
              Cities We Serve
            </h2>
            <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold mb-4 text-center">Karachi</h3>
              <p className="text-gray-600 text-center mb-6">
                We're currently focused on serving the vibrant city of Karachi, Pakistan's largest metropolis. Our efforts are concentrated on addressing food insecurity and promoting community engagement throughout the city.
              </p>
              <div className="flex justify-center">
                <a
                  href="/karachi"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  Learn More About Our Karachi Operations <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 animate-fade-in-up z-50">
          <Bell className="h-5 w-5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{toastIcon} New Donation!</p>
            <p className="text-xs truncate">{toastMessage}</p>
          </div>
          <a
            href="/donate"
            className="px-3 py-1 bg-white text-green-600 rounded text-xs font-medium hover:bg-green-50 transition-colors duration-300 flex-shrink-0"
          >
            Donate
          </a>
        </div>
      )}
    </div>
  )
}