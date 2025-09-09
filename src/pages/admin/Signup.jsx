import React from 'react'

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex w-full max-w-5xl">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 p-8">
        {/* Logo */}
        <h2 className="text-xl font-bold text-purple-600 mb-6">AUTHLOG</h2>

        {/* Title */}
        <h3 className="text-2xl font-semibold mb-6">Signup</h3>

        <form className="space-y-4">
          {/* Name fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I Accept <span className="text-purple-600">Terms And Condition</span>
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account ?{" "}
          <a href="/" className="text-purple-600 font-medium hover:underline">
            Sign in
          </a>
        </p>

        {/* Copyright */}
        <p className="text-xs text-gray-400 text-center mt-6">
          © 2024 Authlog. Design with ❤️ by Shreethemes.
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg"
          alt="Signup illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
  )
}

export default Signup
