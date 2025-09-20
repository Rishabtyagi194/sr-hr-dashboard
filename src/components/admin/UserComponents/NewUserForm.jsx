import React from 'react'

export const NewUserForm = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex w-full max-w-2xl ">
          {/* Left Side - Form */}
          <div className="w-full p-8">
            {/* Logo */}
            <h2 className="text-xl font-bold text-[#0078db] mb-6">AUTHLOG</h2>

            {/* Title */}
            <h3 className="text-2xl font-semibold mb-6">Create User</h3>

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
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none "
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none "
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
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none  "
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
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none "
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none "
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 text-[#0078db] border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I Accept <span className="text-[#0078db]">Terms And Condition</span>
                </label>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-[#0078db] text-white py-2 rounded-lg hover:bg-[#0078db] transition"
              >
                Register
              </button>
            </form>

            {/* Footer */}
            <p className="mt-4 text-sm text-gray-600 text-center">
              Already have an account ?{" "}
              <a href="/" className="text-[#0078db] font-medium hover:underline">
                Sign in
              </a>
            </p>

            {/* Copyright */}
            <p className="text-xs text-gray-400 text-center mt-6">
              © 2024 Authlog. Design with ❤️ by Shreethemes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
