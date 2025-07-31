import React, {useState, useEffect, type FormEvent, type ChangeEvent} from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface RegisterData {
    email: string,
    username: string,
    password: string,
}

interface FormErrors {
    email: string,
    username: string,
    password: string,
}

function RegistrationForm(){

    const navigate = useNavigate()

    const [registrationData, setRegistrationData] = useState<RegisterData>({
        email: '',
        username: '',
        password: ''
    });

    const [error, setErrors] = useState<FormErrors>({
        email: '',
        username: '',
        password: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        {/** update the previous data when a change take place */}
        setRegistrationData(prev =>({
            ...prev,
            [name]:value
        }));

         // Clear error when user types
         if (error[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev, // Keep other errors unchanged
                [name]: '' // Set the current field's error to empty string
            }));
        }
    };

    const validatedForm = (): boolean => {
        let valid = true;
        const newErrors: FormErrors = {email: '', username: '', password: ''};

        if(!registrationData.email){ // checks if the field is empty
            newErrors.email = 'Email is required'
            valid = false
        } else if(!/^\S+@\S+\.\S+$/.test(registrationData.email)){
            newErrors.email = "invalid email"
            valid = false
        };

        if(!registrationData.username){ // checks if the field is empty
            newErrors.username= 'Username is required'
            valid = false
        } else if(registrationData.username.length > 10){
            newErrors.username = 'Username exceeds the character length'
        }

        if (!registrationData.password){
            newErrors.password = 'Password Field Is Empty';
            valid = false
        }else if (registrationData.password.length < 6){
            newErrors.password = 'Password length is too short'
            valid = false
        }

        setErrors(newErrors);
        return valid
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validatedForm()) {  
            try {
                console.log('Form submitting:', registrationData);
                
                const response = await axios.post('http://localhost:3000/register', { 
                    username: registrationData.username,
                    email: registrationData.email,
                    password: registrationData.password
                });
    
                console.log('Registration successful:', response.data);
                
                // Reset form on success
                setRegistrationData({
                    email: '',
                    username: '',
                    password: ''
                });
                
                navigate('/')
            } catch (error) {
                console.error('Failed to send data:', error);
                // Handle error (show to user)
            }
        }
    };
       
    return(
        <form  onSubmit={handleSubmit} className="md:w-3/6 2xl:w-1/5 mx-auto p-4 capitalize italic mt-8">
            <div className="space-y-2 mb-3">
                <Label 
                    htmlFor="username" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Username
                </Label>
                <Input
                    id="username"  
                    name="username"  
                    type="text"
                    value={registrationData.username}
                    onChange={handleChange}
                    className={`w-full ${error.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm`} 
                    required
                    minLength={3}  
                    maxLength={20}  
                    pattern="[a-zA-Z0-9_]+"  
                    title="Only letters, numbers and underscores allowed"  
                    aria-invalid={!!error.username}
                    aria-describedby="username-error" 
                    
                />
                {error.username && (
                    <p id="username-error" className="mt-1 text-sm text-red-600 dark:text-red-400">  {/* Improved error styling */}
                    {error.username}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                </Label>
                <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={registrationData.email}
                    onChange={handleChange}
                    className={`w-full ${error.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                    required
                    aria-invalid={!!error.email}
                    aria-describedby="email-error"
                />
                {error.email && (
                    <p id="email-error" className="text-sm text-red-500">
                        {error.email}
                    </p>
                )}
            </div>

            <div className="space-y-2 mt-3">
                    <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                    </Label>
                    <Input 
                        id="password" 
                        name="password" 
                        type="password" 
                        value={registrationData.password}
                        onChange={handleChange}
                        className={`w-full ${error.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                        required
                        minLength={6}
                        aria-invalid={!!error.password}
                        aria-describedby="password-error"
                    />
                    {error.password && (
                        <p id="password-error" className="text-sm text-red-500">
                            {error.password}
                        </p>
                    )}
            </div>

            <div className="flex items-center justify-between mt-3">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Remember me
                    </label>
                </div>
                
                <div className="text-sm">
                    <a href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                        Forgot password?
                    </a>
                </div>
            </div>

            <div className="flex justify-center mt-3">
                    <Button 
                        type="submit" 
                        className="w-1/4  bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign in
                    </Button>
                </div>
                
                <div className="text-sm text-center text-gray-600 dark:text-gray-400  mt-5 flex justify-end">
                    have an account?{' '}
                    <a 
                        href="/login" 
                        className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 pl-3"
                    >
                        login here
                    </a>
                </div>
        </form>
    )
}

export default RegistrationForm