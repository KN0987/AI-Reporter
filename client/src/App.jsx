import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import About from './pages/About.jsx';
import Profile from './pages/Profile.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Header from "./components/Header.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        
        <Route element={<PrivateRoute />} >
          <Route path="/" element={<Home />}/>
        </Route>
        
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About/>} />
        
        <Route element={<PrivateRoute />} >
          <Route path="/profile" element={<Profile />}/>
        </Route>
      </Routes>

    </BrowserRouter>
  )
}
