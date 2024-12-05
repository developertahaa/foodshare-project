import React, { useState, useEffect } from 'react'
import { Users, Clock, MapPin, Briefcase, Heart, Star, ArrowRight, Quote, LogIn, CheckCircle, X } from 'lucide-react'
import Swal from 'sweetalert2';


export default function Volunteer() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const [formData, setFormData] = useState({
    user_email: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthdate: '',
    occupation: '',
    interests: [],
    experience: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, interests: selectedOptions });
  };

  const [interests, setInterests] = useState([]); // State to store fetched interests

  // Fetch interests from backend
  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await fetch('http://localhost:5003/getInterest'); // Using the specified URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setInterests(data); // Store the fetched interests in state
      } catch (error) {
        console.error('Error fetching interests:', error);
      }
    };

    fetchInterests();
  }, []);
  
  // Submit form data to the server
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formDataWithEmail = {
      ...formData,
      email: sessionStorage.getItem('userEmail'), // Or get from session/cookie
    };
  
    try {
      const response = await fetch('http://localhost:5003/storeVolunteerData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithEmail),
      });
  
      if (response.ok) {
        alert('Form submitted successfully!');
      } else {
        alert('Error submitting form');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <header className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold">Volunteer with FoodShare</h1>
          <p className="mt-2 text-xl">Be the change you wish to see in the world</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          
          <div className="p-8">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 rounded-lg shadow-xl mb-12">
              <Quote className="h-12 w-12 text-white opacity-50 mb-4" />
              <blockquote className="text-2xl font-semibold italic mb-4">
                "The best of people are those who bring most benefit to the rest of mankind."
              </blockquote>
              <p className="text-lg font-medium">- Prophet Muhammad (peace be upon him)</p>
            </div>
            <h2 className="text-3xl font-bold mb-6 text-center">Join Our Mission to End Hunger</h2>
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              At FoodShare, we believe that everyone has the power to make a difference. By volunteering your time and skills, you can help us create a world where no one goes to bed hungry.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold">Community Impact</h3>
                </div>
                <p className="text-gray-700">Make a tangible difference in your local community by helping those in need.</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Clock className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold">Flexible Hours</h3>
                </div>
                <p className="text-gray-700">Choose from a variety of shifts that fit your schedule and availability.</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Briefcase className="h-8 w-8 text-yellow-600 mr-3" />
                  <h3 className="text-xl font-semibold">Skill Development</h3>
                </div>
                <p className="text-gray-700">Gain valuable experience and develop new skills while giving back.</p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center">How Volunteering Works</h3>
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200"></div>
                <div className="space-y-12">
                  {[
                    { title: "Sign Up", description: "Create an account and complete our volunteer application.", icon: LogIn },
                    { title: "Orientation", description: "Attend a brief orientation to learn about our mission and procedures.", icon: Users },
                    { title: "Choose Opportunities", description: "Browse and sign up for volunteer shifts that interest you.", icon: Star },
                    { title: "Make an Impact", description: "Show up, contribute your time and skills, and help fight hunger!", icon: Heart },
                  ].map((step, index) => (
                    <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                        <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                      <div className="relative flex items-center justify-center w-12 h-12 bg-green-500 rounded-full text-white z-10">
                        <step.icon className="h-6 w-6" />
                      </div>
                      <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mb-12">
              <button
                onClick={openModal}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition duration-300 shadow-lg hover:shadow-xl"
              >
                Become a Volunteer
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <a
                href="/login"
                className="inline-flex items-center px-6 py-3 border border-green-600 text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 transition duration-300 shadow-lg hover:shadow-xl"
              >
                Login
                <LogIn className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Our Volunteers Love FoodShare</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-red-100 rounded-full p-4 inline-block mb-4">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Meaningful Impact</h3>
              <p className="text-gray-600">"I can see the direct impact of my work on people's lives."</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-yellow-100 rounded-full p-4 inline-block mb-4">
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Great Community</h3>
              <p className="text-gray-600">"I've met amazing people who share my passion for helping others."</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personal Growth</h3>
              <p className="text-gray-600">"Volunteering has helped me develop new skills and perspectives."</p>
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">Become a Volunteer</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth
        </label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.birthdate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
          Occupation
        </label>
        <input
          type="text"
          id="occupation"
          name="occupation"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.occupation}
          onChange={handleChange}
        />
      </div>
      

      <div className="col-span-2">
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
          Previous Volunteer Experience
        </label>
        <textarea
          id="experience"
          name="experience"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.experience}
          onChange={handleChange}
        ></textarea>
      </div>
     
      <div className="flex justify-end p-6 border-t">
        <button
          type="button"
          onClick={() => setFormData({
            user_email: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            birthdate: '',
            occupation: '',
            interests: [],
            experience: '',
          })}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2 hover:bg-gray-300 transition duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
</div>
      
      )}
    </div>
  )
}