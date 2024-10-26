import React, { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQs() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "How can I donate food?",
      answer: "You can donate food by dropping off non-perishable items at our designated collection points or by scheduling a pickup for larger donations. Check our 'Donate' page for more information on food donation guidelines and locations."
    },
    {
      question: "What volunteer opportunities are available?",
      answer: "We offer various volunteer opportunities including food sorting, distribution, administrative support, and event planning. Visit our 'Volunteer' page to see current openings and sign up for shifts that match your interests and availability."
    },
    {
      question: "How does FoodShare ensure food safety?",
      answer: "We follow strict food safety guidelines set by health authorities. All donated food is inspected, and we maintain proper storage conditions. Our volunteers are trained in food safety practices to ensure that the food we distribute is safe for consumption."
    },
    {
      question: "Can I donate money instead of food?",
      answer: "Monetary donations are greatly appreciated as they allow us to purchase food in bulk at discounted rates and cover operational costs. You can make a secure online donation through our website or send a check to our mailing address."
    },
    {
      question: "How can I request food assistance?",
      answer: "If you're in need of food assistance, please visit our 'Get Help' page to find information on our food distribution programs and eligibility requirements. You can also call our helpline for immediate assistance and guidance."
    },
    {
      question: "Does FoodShare accept all types of food donations?",
      answer: "While we appreciate all donations, we primarily accept non-perishable food items that are unopened and within their expiration date. For fresh produce or perishable items, please contact us in advance to ensure we can handle the donation properly."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <header className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold">Frequently Asked Questions</h1>
          <p className="mt-2 text-xl">Find answers to common questions about FoodShare</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <HelpCircle className="h-8 w-8 text-blue-600 mr-2" />
              FAQs
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <button
                    className="flex justify-between items-center w-full text-left"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-blue-600" />
                    )}
                  </button>
                  {openFaq === index && (
                    <p className="mt-2 text-gray-600">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <HelpCircle className="h-6 w-6 text-blue-600 mr-2" />
                Still Have Questions?
              </h3>
              <p className="text-gray-700">
                If you couldn't find the answer you were looking for, please don't hesitate to contact us. Our team is here to help!
              </p>
              <a
                href="/contact"
                className="mt-4 inline-block px-6 py-2  bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}