import React, {useRef, useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {app} from "../firebase";
import {useDispatch} from "react-redux";
import {updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOut } from "../redux/user/userSlice.js";

export default function Profile() {
    const {currentUser, loading, error} = useSelector(state => state.user);
    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({});
    const [doesPasswordMatch, setPasswordMatch] = useState(true);
    const [isPasswordChanged, setPasswordChanged] = useState(false);
    const [updateSucess, setUpdateSuccess] = useState(false);
    
    const dispatch = useDispatch();

    useEffect(() => {
        if(image){
            handleFileUpload(image);
        }
    }, [image]);

    const handleFileUpload = async (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef  = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePercent(Math.round(progress));
            },
            (error) => {
                setImageError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setFormData({...formData, profilePicture: downloadURL}));
            },
        );
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    
        if (id === "password" || id === "confirmPassword") {
            setPasswordChanged(true);
            const password = id === "password" ? value : formData.password;
            const confirmPassword = id === "confirmPassword" ? value : formData.confirmPassword;
            
            if(!password && !confirmPassword){
                setPasswordMatch(true);
            }else if(!password || !confirmPassword){
                setPasswordMatch(false);
            }else {
                setPasswordMatch(password === confirmPassword);
            }
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(doesPasswordMatch){
            try{
                dispatch(updateUserStart());
                const res = await fetch(`https://ai-summarizer-alpha-nine.vercel.app/api/user/update/${currentUser._id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify(formData),
                });
                const data = await res.json();
                if (data.success === false){
                    dispatch(updateUserFailure(data));
                    return;
                }
                dispatch(updateUserSuccess(data));
                setUpdateSuccess(true);
            } catch(error){
                dispatch(updateUserFailure(error));
            }
        }
    }

    const handleDeleteAccount = async(event) => {
        try{
            dispatch(deleteUserStart());
            const res = await fetch(`https://ai-summarizer-alpha-nine.vercel.app/api/user/delete/${currentUser._id}`, {
                method: "DELETE",}
            );
            const data = await res.json();
            if (data.success === false){
                dispatch(deleteUserFailure(data));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch(error){
            dispatch(deleteUserFailure(error));
        }
    };

    const handleSignOut = async () => {
        try{
            await fetch("/api/auth/signout");
            localStorage.removeItem("articles");
            dispatch(signOut());
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen relative">
            <div className="main">
                <div className="gradient"></div>
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto p-6 pt-24">
                <div className="profile-container p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
                        <p className="text-white/70">Manage your profile and preferences</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Profile Picture Section */}
                        <div className="text-center">
                            <input 
                                type="file" 
                                ref={fileRef} 
                                hidden 
                                accept="image/*" 
                                onChange={(event) => setImage(event.target.files[0])} 
                            />
                            <div className="relative inline-block">
                                <img 
                                    src={formData.profilePicture || currentUser.profilePicture} 
                                    alt="profile" 
                                    className="h-32 w-32 rounded-full object-cover border-4 border-white/30 shadow-xl cursor-pointer hover:border-white/50 transition-all duration-300" 
                                    onClick={() => fileRef.current.click()}
                                />
                                <div className="absolute bottom-2 right-2 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform duration-300"
                                     onClick={() => fileRef.current.click()}>
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                            </div>
                            
                            {imageError ? (
                                <p className="error-text text-sm mt-2">
                                    Error uploading image (File size must be less than 2 MB)
                                </p>
                            ) : imagePercent > 0 && imagePercent < 100 ? (
                                <div className="mt-4">
                                    <div className="w-full bg-white/20 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" 
                                             style={{width: `${imagePercent}%`}}></div>
                                    </div>
                                    <p className="text-white/70 text-sm mt-2">Uploading: {imagePercent}%</p>
                                </div>
                            ) : imagePercent === 100 ? (
                                <p className="success-text text-sm mt-2">Image uploaded successfully!</p>
                            ) : null}
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">Username</label>
                                <input 
                                    defaultValue={currentUser.username} 
                                    type="text" 
                                    id="username" 
                                    className="profile-input" 
                                    readOnly 
                                />
                            </div>
                            
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
                                <input 
                                    defaultValue={currentUser.email} 
                                    type="email" 
                                    id="email" 
                                    className="profile-input" 
                                    readOnly 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">New Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    placeholder="Enter new password" 
                                    className="profile-input" 
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">Confirm Password</label>
                                <input 
                                    type="password" 
                                    id="confirmPassword" 
                                    placeholder="Confirm new password" 
                                    className="profile-input" 
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {isPasswordChanged && (
                            <div className="text-center">
                                {doesPasswordMatch ? (
                                    <p className="success-text">Passwords match!</p>
                                ) : (
                                    <p className="error-text">Passwords do not match!</p>
                                )}
                            </div>
                        )}

                        <button 
                            type="submit"
                            disabled={loading || (isPasswordChanged && !doesPasswordMatch)}
                            className="auth-button"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </div>
                            ) : 'Update Profile'}
                        </button>

                        {/* Action Buttons */}
                        <div className="flex justify-between items-center pt-6 border-t border-white/20">
                            <button 
                                type="button"
                                className="danger-button"
                                onClick={handleDeleteAccount}
                            >
                                Delete Account
                            </button>
                            <button 
                                type="button"
                                className="danger-button"
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </button>
                        </div>

                        {/* Status Messages */}
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
                                <p className="error-text text-center">Something went wrong!</p>
                            </div>
                        )}
                        
                        {updateSucess && (
                            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
                                <p className="success-text text-center">Profile updated successfully!</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}