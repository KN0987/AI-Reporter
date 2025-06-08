import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {signInStart, signInSuccess, signInFailure} from "../redux/user/userSlice.js";
import {useDispatch, useSelector} from "react-redux";
import OAuth from "../components/OAuth.jsx";

export default function SignIn() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const {value, name} = event.target;
    setInput(prev =>  {
        return {
            ...prev, 
            [name]: value
        };
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      dispatch(signInStart());
      const res = await fetch("https://ai-summarizer-alpha-nine.vercel.app/api/auth/signin", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
  
      if (data.success === false){
        dispatch(signInFailure(data));
        return;
      } 
      dispatch(signInSuccess(data));
      navigate("/");
    }catch(error){
      dispatch(signInFailure(error));
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="main">
        <div className="gradient"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md mx-auto p-6">
        <div className="auth-container">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/70">Sign in to continue summarizing articles</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email"  
                name="email" 
                className="auth-input"
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                name="password" 
                className="auth-input"
                onChange={handleChange}
                required
              />
            </div>
            
            <button 
              disabled={loading} 
              className="auth-button"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </div>
              ) : 'Sign In'}
            </button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-white/70">Or continue with</span>
              </div>
            </div>
            
            <OAuth />
            
            <div className="text-center">
              <p className="text-white/70">
                Don't have an account?{' '}
                <Link to='/sign-up' className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300">
                  Sign up
                </Link>
              </p>
            </div>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
                <p className="error-text text-center">
                  {error.message || "Something went wrong!"}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}