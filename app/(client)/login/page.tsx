"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import HeroSectionForPages from "../components/HeroSectionForPages";

interface FormErrors {
  email?: string;
  password?: string;
}

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export default function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Validation rules
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 1) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     if (validateForm()) {
  //       setIsLoading(true);
  //       try {
  //         const result = await login(formData);

  //         if (result.success) {
  //           setSuccessMessage(result.message);
  //           setIsSubmitted(true);
  //           setTimeout(() => {
  //             setFormData({
  //               email: '',
  //               password: '',
  //             });
  //             setIsSubmitted(false);
  //             setSuccessMessage('');
  //           }, 2000);
  //         } else {
  //           if (result.errors) {
  //             const errorMap: FormErrors = {};
  //             result.errors.forEach((error) => {
  //               errorMap[error.field as keyof FormErrors] = error.message;
  //             });
  //             setErrors(errorMap);
  //           } else {
  //             setErrors({ email: result.message || 'Login failed' });
  //           }
  //         }
  //       } catch (error) {
  //         console.error('Login error:', error);
  //         setErrors({ email: 'An error occurred. Please try again.' });
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //   };

  return (
    <main className="space-y-3 w-full mx-auto px-4 py-5 sm:px-6 sm:py-14 md:space-y-5 md:px-10 md:py-10 lg:w-full lg:flex lg:items-center lg:justify-around lg:px-20 xl:px-30">
      <HeroSectionForPages title="Login" />

      {/* form section */}
      <section className="bg-(--primary-bg-color) rounded-lg shadow-lg px-5 py-4 w-full lg:w-xl">
        <h2 className="text-3xl font-bold text-(--primary-text-color) mb-2 text-center">
          Welcome Back
        </h2>
        <p className="text-(--bg-muted) text-center mb-8">
          Sign in to your account
        </p>

        {/* {isSubmitted && successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm font-medium">
              {successMessage}
            </p>
          </div>
        )} */}

        <form className="space-y-5">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-(--primary-text-color) mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition text-(--primary-text-color) bg-white placeholder-(--bg-muted) ${
                errors.email
                  ? "border-(--secondary-bg-color) focus:ring-(--secondary-bg-color)"
                  : "border-(--surface) focus:ring-(--secondary-bg-color)"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-(--primary-text-color) mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                className={`w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition text-(--primary-text-color) bg-(--primary-bg-color) placeholder-(--bg-muted) ${
                  errors.password
                    ? "border-(--secondary-bg-color) focus:ring-(--secondary-bg-color)"
                    : "border-(--surface) focus:ring-(--secondary-bg-color)"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-(--bg-muted) hover:text-(--primary-text-color)/70 focus:outline-none hover:cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 border-(--surface) rounded focus:ring-(--secondary-bg-color) cursor-pointer"
              />
              <span className="ml-2 text-sm text-(--primary-text-color)/70">Remember me</span>
            </label>
            <a
              href="#"
              className="text-sm text-(--secondary-bg-color) hover:(--secondary-bg-color) hover:underline font-medium"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-(--secondary-bg-color) text-(--primary-bg-color) font-semibold py-2 px-4 rounded-lg hover:bg-(--secondary-bg-color) hover:scale-95 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--secondary-bg-color) focus:ring-offset-2 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-(--surface)"></div>
          <span className="px-4 text-(--bg-muted) text-sm">or</span>
          <div className="flex-1 border-t border-(--surface)"></div>
        </div>

        {/* Switch to Signup */}
        <div className="mt-6 text-center">
          <p className="text-(--bg-muted)">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              onClick={onSwitchToSignup}
              className="text-(--secondary-bg-color) font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
