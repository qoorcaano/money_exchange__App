import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser }from '../services/api-calls';
import { toast } from 'react-toastify';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [phone, setPhone] = useState('');

  // check if password and confirm password are same

  async function submit(e) {
    e.preventDefault();
    
    if (
      name === "" ||
      email === "" ||
     
      password === "" ||
      confirm === ""||
      phone === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    } else if (password.length < 4 || password !== confirm) {
      toast.error(
        "Password and Confirm Password must be same or password digits less then 4"
      );
      return;
    }
  
    try {
      // Attempt to sign up the user
      const response = await registerUser({ name, email, password ,phone  });
  
      // If successful, store the token, navigate to home, and show success toast
      if(password !== confirm){
        toast.error('Password and confirm password are not same');
        return;
      }
     else{
      localStorage.setItem("token", response.token);
      navigate("/");
      toast.success('Signup successful');
     }

  
    } catch (error) {
      // Handle different error scenarios
      if (error.message) {
        // Show a specific toast message for incorrect password or email
        toast.error(error.message);

      }
      
     
       else if (error.message ) {
        // Show a specific toast message for missing required fields
        toast.error(error.message);
      }
     
       else if (error.message) {
        // Show a specific toast message for an existing user
        toast.error(error.message);
      } else {
        // Handle other errors
       
        toast.error('An unexpected error occurred');
      }
    }
  }
  

  return (
    <div className="bg-gray-100">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-16 rounded shadow-2xl w-2/3">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">Signup</h2>
          <form onSubmit={submit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 p-2 w-full"
               
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-2 w-full"
                required
              />
            </div>
           
            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Phone
              </label>
              <input
                type="phone"
                name="phone"
                id="phone"
                placeholder="Your Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-300 p-2 w-full"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-2 w-full"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="border border-gray-300 p-2 w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="block w-full bg-indigo-500 p-4 rounded text-indigo-100"
            >
              Signup
            </button>
          </form>
          <div className="text-center mt-4">
            <span className="text-sm">Already have an account?</span>{" "}
            <Link to="/" className="text-indigo-600 hover:underline">
              Login Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
