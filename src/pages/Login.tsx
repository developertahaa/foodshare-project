'use client'

import React, { useState, useEffect } from 'react'
import { Mail, Lock, User, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react'
import Swal from 'sweetalert2'

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))

    if (name === 'email') {
      validateEmail(value)
    } else if (name === 'password' && !isLogin) {
      checkPasswordStrength(value)
    }
  }

  const validateEmail = (email: string) => {
    const validDomains = ['gmail.com', 'hotmail.com', 'yahoo.com']
    const domain = email.split('@')[1]
    if (email && (!domain || !validDomains.includes(domain))) {
      setEmailError('Please use a Gmail, Hotmail, or Yahoo email address.')
    } else {
      setEmailError('')
    }
  }

  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++
    if (password.match(/\d/)) strength++
    if (password.match(/[^a-zA-Z\d]/)) strength++
    setPasswordStrength(strength)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (emailError || (!isLogin && passwordStrength < 3)) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please correct the errors in the form.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return
    }

    try {
      const url = isLogin ? 'http://localhost:5009/login' : 'http://localhost:5009/signup'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        console.log("User's email from session:", formData.email)
        sessionStorage.setItem('sessionId', result.sessionId)
        sessionStorage.setItem('userEmail', formData.email)

        Swal.fire({
          title: isLogin ? 'Login Successful' : 'Signup Successful',
          text: isLogin ? 'Welcome back!' : 'Your account has been created.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#10B981',
        }).then(() => {
          if (isLogin) {
            window.location.href = '/helphome'
          }
        })
      } else {
        Swal.fire({
          title: 'Error',
          text: result.message || 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to connect to the server',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }

    setFormData({
      email: '',
      password: '',
      name: '',
    })
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Lock className="mx-auto h-12 w-12 text-green" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-green">
            {isLogin ? 'Welcome Back!' : 'Join Us Today'}
          </h2>
          <p className="mt-2 text-center text-sm text-green">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-green underline hover:text-green-200"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-10 appearance-none block w-full px-3 py-2 border ${
                    emailError ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                  placeholder="you@example.com"
                />
              </div>
              {emailError && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  <AlertCircle className="h-5 w-5 text-red-500 inline mr-1" />
                  {emailError}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {!isLogin && (
                <div className="mt-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-2 w-1/4 ${
                          passwordStrength >= level
                            ? 'bg-green-500'
                            : 'bg-gray-200'
                        } mr-1 rounded-full`}
                      ></div>
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {passwordStrength < 3
                      ? 'Password should be at least 8 characters long and include uppercase, lowercase, number, and special character.'
                      : 'Strong password!'}
                  </p>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {isLogin ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </form>

          
        </div>
      </div>
    </div>
  )
}