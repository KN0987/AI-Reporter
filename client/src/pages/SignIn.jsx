import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {signInStart, signInSuccess, signInFailure} from "../redux/user/userSlice.js";
import {useDispatch, useSelector} from "react-redux";


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
      const res = await fetch("/api/auth/signin", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      console.log(data);
  
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
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Login</h1>
        <form onSubmit={handleSubmit} className = "bg-[#F6F8FA] flex flex-col gap-4 justify-center items-center pt-12 pb-2 rounded-lg border-2 border-[#d1d9e0b3]">
          <input type = "text" placeholder="Username"  name="username" className="w-3/4 p-3 rounded-lg border-2 border-[#d1d9e0b3]" onChange = {handleChange}/>
          <input type = "password" placeholder="Password" name="password" className="w-3/4 p-3 rounded-lg border-2 border-[#d1d9e0b3]" onChange = {handleChange}/>
          <div className="flex justify-center">
            <button disabled={loading} className="bg-slate-700 text-white rounded-lg w-40 h-8 hover:opacity-75 disabled:opacity-60">{loading ? 'Loading...':'Login'}</button>
          </div>
          <div className="flex mt-4 gap-2">
          <p>Not registered yet?</p>
          <Link to='/sign-up'>
            <span className="text-blue-500">Sign up</span>
          </Link>
        </div>
        <p className="text-red-700 mt-5">{error ? error.message || "Something went wrong!" : ""}</p>
        </form>

    </div>
  )
}
