import React from 'react'
import { Shield, Heart, Users, Lock, ArrowRight } from 'lucide-react'

export default function AskHelp() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <header className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold">Ask for Help</h1>
          <p className="mt-2 text-xl">We're here to support you in times of need</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">How We Can Help You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Heart className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Compassionate Support</h3>
                  <p className="text-gray-600">Our team is dedicated to providing caring and understanding assistance to those in need.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="bg-green-100 rounded-full p-3">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Community Resources</h3>
                  <p className="text-gray-600">We connect you with a network of local resources and support services tailored to your needs.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-blue-50 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-blue-100 rounded-full opacity-50"></div>
              <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-green-100 rounded-full opacity-50"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Shield className="h-8 w-8 text-blue-600 mr-2" />
                  Anonymous Support
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  We understand that asking for help can be difficult. That's why we offer an anonymous support option, ensuring your privacy and comfort.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Your personal information is kept confidential</li>
                  <li>Receive help without disclosing your identity</li>
                  <li>Safe and secure communication channels</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-xl text-gray-700 mb-6">Ready to get the support you need?</p>
              <a
                href="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition duration-300 shadow-lg hover:shadow-xl"
              >
                Login to Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <p className="mt-4 text-sm text-gray-500">
                Don't have an account? <a href="/login" className="text-green-600 hover:underline">Sign up here</a>
              </p>
            </div>
          </div>
        </div>

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
      </main>

    </div>
  )
}