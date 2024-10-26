import React from 'react'
import { Gift, TrendingUp, Users, Truck, Heart, ArrowRight, PieChart, AlertTriangle, Utensils, UserX, Globe, DollarSign } from 'lucide-react'

export default function Donations() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <header className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold">Make a Donation</h1>
          <p className="mt-2 text-xl">Your generosity can change lives</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">How Your Donation Helps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 rounded-full p-4 mb-4">
                  <Gift className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Provide Meals</h3>
                <p className="text-gray-600">Your donation helps us provide nutritious meals to those in need.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 rounded-full p-4 mb-4">
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Support Distribution</h3>
                <p className="text-gray-600">We use donations to fuel our food distribution network, reaching more communities.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 rounded-full p-4 mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Empower Communities</h3>
                <p className="text-gray-600">Your support helps us build sustainable food programs in local communities.</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-12">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                How Donations Reach Those in Need
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Donations are collected and allocated to our food programs</li>
                <li>Our team identifies areas and communities with the highest need</li>
                <li>We partner with local organizations to set up distribution points</li>
                <li>Food and resources are transported to these locations</li>
                <li>Volunteers help distribute meals and supplies to individuals and families</li>
                <li>We monitor the impact and adjust our approach to maximize effectiveness</li>
              </ol>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
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

            <div className="text-center">
              <p className="text-xl text-gray-700 mb-6">Ready to make a difference?</p>
              <a
                href="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition duration-300 shadow-lg hover:shadow-xl"
              >
                Login to Donate
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <p className="mt-4 text-sm text-gray-500">
                Don't have an account? <a href="/signup" className="text-green-600 hover:underline">Sign up here</a>
              </p>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}