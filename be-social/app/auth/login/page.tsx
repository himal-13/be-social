'use client'
import { auth } from '@/services/Firebase';
import Spinner from '@/utils/Spinner';
import { useUserContext } from '@/utils/UserContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

const Login: React.FC = () => {
    const router = useRouter()
    const{loadCurrentUser} = useUserContext()
    const[isLoading,setIsLodaing] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
    const[loginError,setLoginError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); 
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        if (!formData.email.trim()) {
        newErrors.email = 'Email is required.';
        isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email address.';
        isValid = false;
        }

        if (!formData.password.trim()) {
        newErrors.password = 'Password is required.';
        isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async(e: React.FormEvent) => {
        setIsLodaing(true)
        e.preventDefault();
        if (validateForm()) {
            try{
               const credentials= await signInWithEmailAndPassword(auth,formData.email,formData.password)
               if(credentials){
                loadCurrentUser(credentials.user)
                router.replace('/')

               }
            }catch(e:any){
                setLoginError(e.code.toString())
                setIsLodaing(false)

            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
        <div className=" p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className=" text-4xl md:text-5xl font-bold font-sans mb-6">Welcome back!</h2>
            {loginError &&<h3 className='p-2 bg-red-300 flex items-center'><span className='p-2 cursor-pointer' onClick={()=>setLoginError('')}><RxCross2 /></span>{loginError}</h3>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring focus:ring-blue-500`}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring focus:ring-blue-500`}
                        required
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <button
                    type="submit"
                    className="h-[5vh] w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    {isLoading?<Spinner/>:'Login'}
                </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
            Don't have an account? <span onClick={()=>router.replace('/auth/signup')} className="text-blue-500 hover:underline cursor-pointer">Sign Up</span>
            </p>
        </div>
        </div>
    );
};

export default Login;
