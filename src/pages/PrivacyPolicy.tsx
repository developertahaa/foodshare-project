import React from 'react'
import { Shield, Eye, Lock, Trash2, RefreshCw, AlertTriangle } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <header className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold">Privacy Policy</h1>
          <p className="mt-2 text-xl">Your privacy is important to us</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-2" />
              Our Commitment to Privacy
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              At FoodShare, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
            </p>

            <div className="space-y-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Eye className="h-6 w-6 text-blue-600 mr-2" />
                  Information We Collect
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Personal information (name, email, phone number)</li>
                  <li>Demographic information</li>
                  <li>Donation history</li>
                  <li>Volunteer preferences and history</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Lock className="h-6 w-6 text-green-600 mr-2" />
                  How We Protect Your Data
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Encryption of sensitive information</li>
                  <li>Regular security audits</li>
                  <li>Limited access to personal data</li>
                  <li>Compliance with data protection regulations</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Trash2 className="h-6 w-6 text-yellow-600 mr-2" />
                  Your Rights
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Right to access your personal data</li>
                  <li>Right to request data deletion</li>
                  <li>Right to opt-out of marketing communications</li>
                  <li>Right to update or correct your information</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <RefreshCw className="h-6 w-6 text-red-600 mr-2" />
                Changes to This Policy
              </h3>
              <p className="text-gray-700">
                We reserve the right to modify this privacy policy at any time. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated.
              </p>
            </div>

            <div className="mt-8 bg-gray-100 p-4 rounded-lg flex items-start">
              <AlertTriangle className="h-6 w-6 text-gray-600 mr-2 flex-shrink-0 mt-1" />
              <p className="text-sm text-gray-600">
                This privacy policy is subject to change without notice. It was last updated on {new Date().toLocaleDateString()}. If you have any questions about this policy, please contact us at privacy@foodshare.org.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}