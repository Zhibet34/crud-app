import React, {useState, type FormEvent, type ChangeEvent} from "react";
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios";

interface LoginData {
    email: string,
    password: string
};

interface FormErrors {
    email: string,
    password: string
}


function LoginForm(){
    const [loginData, setloginData] = useState<LoginData>({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<FormErrors>({
        email: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        {/** update the previous data when a change take place */}
        setloginData(prev =>({
            ...prev,
            [name]:value
        }));

         // Clear error when user types
         if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev, // Keep other errors unchanged
                [name]: '' // Set the current field's error to empty string
            }));
        }
    };

    const validatedForm = (): boolean => {
        let valid = true;
        const newErrors: FormErrors = {email: '', password: ''};

        if(!loginData.email){ // checks if the field is empty
            newErrors.email = 'Email is required'
            valid = false
        } else if(!/^\S+@\S+\.\S+$/.test(loginData.email)){
            newErrors.email = "invalid email"
            valid = false
        };

        if (!loginData.password){
            newErrors.password = 'Password Field Is Empty';
            valid = false
        }else if (loginData.password.length < 6){
            newErrors.password = 'Password length is too short'
            valid = false
        }

        setErrors(newErrors);
        return valid
    }

    const handleSubmit = async(e : FormEvent) => {
        e.preventDefault();

        if(validatedForm()){
            console.log('Form submitted:', loginData);
            setloginData({
                email: '',
                password: ''
            })
        }
    }
    return(
        <>
            <form  onSubmit={handleSubmit} className="md:w-3/6 2xl:w-1/5 mx-auto p-4 capitalize italic">
            <div className="space-y-2">
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address
                    </Label>
                    <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={loginData.email}
                        onChange={handleChange}
                        className={`w-full ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                        required
                        aria-invalid={!!errors.email}
                        aria-describedby="email-error"
                    />
                    {errors.email && (
                        <p id="email-error" className="text-sm text-red-500">
                            {errors.email}
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
                        value={loginData.password}
                        onChange={handleChange}
                        className={`w-full ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                        required
                        minLength={6}
                        aria-invalid={!!errors.password}
                        aria-describedby="password-error"
                    />
                    {errors.password && (
                        <p id="password-error" className="text-sm text-red-500">
                            {errors.password}
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
                    Don't have an account?{' '}
                    <a 
                        href="/registration" 
                        className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 pl-3"
                    >
                        Register here
                    </a>
                </div>
            </form>
    </>
    )
}

export default LoginForm