import React, { useState, type FormEvent, type ChangeEvent } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";

interface LoginData {
  email: string;
  password: string;
};

interface FormErrors {
  email: string;
  password: string;
}

function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatedForm = (): boolean => {
    let valid = true;
    const newErrors: FormErrors = { email: '', password: '' };

    if (!loginData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(loginData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (loginData.password.length < 6) {
      newErrors.password = 'Must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (validatedForm()) {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          email: loginData.email,
          password: loginData.password
        }, {
          withCredentials: true
        });
        
        console.log('Login successful', response.data);
        navigate('/');
      } catch (error: any) {
        console.error('Login failed:', error.response?.data?.message || error.message);
        setErrors({
          email: ' ',
          password: 'Invalid email or password'
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                value={loginData.email}
                onChange={handleChange}
                className={`pl-10 w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="your@email.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleChange}
                className={`pl-10 w-full ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">Don't have an account? </span>
          <button 
            onClick={() => navigate('/registration')}
            className="font-medium text-blue-600 hover:text-blue-500 inline-flex items-center"
          >
            Sign up <FiArrowRight className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;