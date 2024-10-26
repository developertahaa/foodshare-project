import React from 'react'
import { FileText, UserCheck, Scale, AlertCircle, HelpCircle, RefreshCw } from 'lucide-react'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <header className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold">Terms of Service</h1>
          <p className="mt-2 text-xl">Please read these terms carefully</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <FileText className="h-8 w-8 text-blue-600 mr-2" />
              FoodShare Terms of Service
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              By using our services, you agree to be bound by the following terms and conditions. Please read them carefully.
            </p>

            <div className="space-y-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <UserCheck className="h-6 w-6 text-blue-600 mr-2" />
                  User Responsibilities
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the confidentiality of your account</li>
                  <li>Use the service for lawful purposes only</li>
                  <li>Respect the rights of other users and the organization</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Scale className="h-6 w-6 text-green-600 mr-2" />
                  Intellectual Property
                </h3>
                <p className="text-gray-700">
                  All content and materials available on FoodShare are the property of FoodShare or its licensors and are protected by copyright, trademark, and other intellectual property laws.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <AlertCircle className="h-6 w-6 text-yellow-600 mr-2" />
                  Limitation of Liability
                </h3>
                <p className="text-gray-700">
                  FoodShare shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <HelpCircle className="h-6 w-6 text-purple-600 mr-2" />
                  Dispute Resolution
                </h3>
                <p className="text-gray-700">
                  Any disputes arising from or relating to these Terms of Service shall be resolved through arbitration in accordance with the rules of the American Arbitration Association.
                </p>
              </div>
            </div>

            <div className="mt-12 bg-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <RefreshCw className="h-6 w-6 text-red-600 mr-2" />
                Changes to Terms
              </h3>
              <p className="text-gray-700">
                We reserve the right to modify or replace these Terms at any time. Changes will be effective immediately upon posting on the FoodShare website. Your continued use of the service after any changes indicates your acceptance of the new Terms.
              </p>
            </div>

            <div className="mt-8 bg-gray-100 p-4 rounded-lg flex items-start">
              <AlertCircle className="h-6 w-6 text-gray-600 mr-2 flex-shrink-0 mt-1" />
              <p className="text-sm text-gray-600">
                These Terms of Service were last updated on {new Date().toLocaleDateString()}. If you have any questions about these Terms, please contact us at legal@foodshare.org.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}