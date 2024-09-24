import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import OAuth from '../components/OAuth.jsx';

export default function SignUp() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const [err,setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false){
        setError(true);
        return;
      } 
      navigate("/sign-in");
    }catch(error){
      setLoading(false);
      setError(true);
    }
    
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Sign Up</h1>
        <form onSubmit={handleSubmit} className = "bg-[#F6F8FA] flex flex-col gap-4 justify-center items-center pt-12 pb-2 rounded-lg border-2 border-[#d1d9e0b3]">
        <input type = "text" placeholder="Username"  name="username" className="w-3/4 p-3 rounded-lg border-2 border-[#d1d9e0b3]" onChange = {handleChange}/>
          <input type = "text" placeholder="Email"  name="email" className="w-3/4 p-3 rounded-lg border-2 border-[#d1d9e0b3]" onChange = {handleChange}/>
          <input type = "password" placeholder="Password" name="password" className="w-3/4 p-3 rounded-lg border-2 border-[#d1d9e0b3]" onChange = {handleChange}/>
          <button disabled={loading} className="bg-slate-700 text-white rounded-lg w-3/4 h-8 hover:opacity-75 disabled:opacity-60">{loading ? 'Loading...':'Sign up'}</button>
          <OAuth />
          <div className="flex mt-4 gap-2">
          <p>Have an account?</p>
          <Link to='/sign-in'>
            <span className="text-blue-500">Sign in</span>
          </Link>
        </div>
        <p className="text-red-700 mt-5">{err && "Username and email already exist!"}</p>
        </form>

    </div>
  )
}
