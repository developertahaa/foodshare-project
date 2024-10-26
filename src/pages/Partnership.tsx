import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Handshake, X } from 'lucide-react';

export default function PartnerWithUs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [formData, setFormData] = useState({
    organizationName: '',
    website: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    organizationType: '',
    employeeCount: '',
    annualRevenue: '',
    partnershipType: '',
    missionAlignment: '',
    partnershipGoals: '',
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/partnerships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire('Success', 'Partnership application submitted successfully!', 'success');
        closeModal();
      } else {
        Swal.fire('Error', 'There was an error submitting the application', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'There was an error submitting the application', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold">Partner With Us</h1>
          <p className="mt-2 text-xl">Join our mission to fight hunger and make a difference in our community</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">Why Partner With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Make a Real Impact</h3>
                <p className="text-gray-600">Your partnership directly contributes to feeding those in need and building a stronger community.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Enhance Your Reputation</h3>
                <p className="text-gray-600">Demonstrate your commitment to social responsibility and gain positive brand recognition.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Network Opportunities</h3>
                <p className="text-gray-600">Connect with other socially conscious businesses and organizations in our network.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Tailored Partnerships</h3>
                <p className="text-gray-600">We offer flexible partnership options to suit your organization's goals and capabilities.</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={openModal}
                className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition duration-300"
              >
                Become a Partner
              </button>
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">Partnership Application</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {/* Form Fields */}
                <div>
                  <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    id="organizationName"
                    name="organizationName"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="organizationType" className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Type
                  </label>
                  <select
                    id="organizationType"
                    name="organizationType"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="food_catering">Food Catering</option>
                    <option value="grocery_store">Grocery Store</option>
                    <option value="logistics_company">Logistics Company</option>
                    <option value="corporate_sponsor">Corporate Sponsor</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Employees
                  </label>
                  <input
                    type="number"
                    id="employeeCount"
                    name="employeeCount"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="1"
                  />
                </div>
                <div>
                  <label htmlFor="annualRevenue" className="block text-sm font-medium text-gray-700 mb-1">
                    Annual Revenue (USD)
                  </label>
                  <input
                    type="number"
                    id="annualRevenue"
                    name="annualRevenue"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="0"
                  />
                </div>
                <div>
                  <label htmlFor="partnershipType" className="block text-sm font-medium text-gray-700 mb-1">
                    Partnership Type
                  </label>
                  <select
                    id="partnershipType"
                    name="partnershipType"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="food_donations">Food Donations</option>
                    <option value="financial_support">Financial Support</option>
                    <option value="volunteering">Volunteering</option>
                    <option value="awareness_campaigns">Awareness Campaigns</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label htmlFor="missionAlignment" className="block text-sm font-medium text-gray-700 mb-1">
                    Mission Alignment
                  </label>
                  <textarea
                    id="missionAlignment"
                    name="missionAlignment"
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="partnershipGoals" className="block text-sm font-medium text-gray-700 mb-1">
                    Partnership Goals
                  </label>
                  <textarea
                    id="partnershipGoals"
                    name="partnershipGoals"
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="col-span-2 flex items-center">
                  <input
                    type="checkbox"
                    id="agreedToTerms"
                    name="agreedToTerms"
                    onChange={handleChange}
                    className="mr-2"
                    required
                  />
                  <label htmlFor="agreedToTerms" className="text-sm text-gray-600">
                    I agree to the terms and conditions.
                  </label>
                </div>
                <div className="col-span-2 flex justify-end">
                  <button
                    type="submit" // Ensure button is of type submit
                    className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition duration-300"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
