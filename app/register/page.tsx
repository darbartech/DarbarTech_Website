"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import HeroSectionForPages from "../components/HeroSectionForPages";

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Validation rules
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    } else if (formData.fullName.trim().length > 50) {
      newErrors.fullName = "Full name must not exceed 50 characters";
    }

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
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (formData.password.length > 128) {
      newErrors.password = "Password must not exceed 128 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    } else if (
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)
    ) {
      newErrors.password =
        "Password must contain at least one special character";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
  //         const result = await signup(formData);

  //         if (result.success) {
  //           setSuccessMessage(result.message);
  //           setIsSubmitted(true);
  //           setTimeout(() => {
  //             setFormData({
  //               fullName: '',
  //               email: '',
  //               password: '',
  //               confirmPassword: '',
  //             });
  //             setIsSubmitted(false);
  //             setSuccessMessage('');
  //             // Redirect to login form after success
  //             onSwitchToLogin();
  //           }, 2000);
  //         } else {
  //           if (result.errors) {
  //             const errorMap: FormErrors = {};
  //             result.errors.forEach((error) => {
  //               errorMap[error.field as keyof FormErrors] = error.message;
  //             });
  //             setErrors(errorMap);
  //           } else {
  //             setErrors({ email: result.message || 'Signup failed' });
  //           }
  //         }
  //       } catch (error) {
  //         console.error('Signup error:', error);
  //         setErrors({ email: 'An error occurred. Please try again.' });
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //   };

  return (
    <div className="w-full max-w-md mx-auto">
      <HeroSectionForPages title="Register" />
      <div className="bg-(--primary-bg-color) rounded-lg shadow-lg p-8 mb-10">
        <h2 className="text-3xl font-bold text-(--primary-text-color) mb-2 text-center">
          Create Account
        </h2>
        <p className="text-(--bg-muted) text-center mb-8">
          Join us today to get started
        </p>

        {isSubmitted && successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm font-medium">
              {successMessage}
            </p>
          </div>
        )}

        <form className="space-y-5">
          {/* Full Name Field */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-(--bg-muted) mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition text-(--primary-text-color) bg-(--primary-bg-color) placeholder-(--bg-muted) ${
                errors.fullName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-(--surface) focus:ring-(--secondary-bg-color)"
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-(--bg-muted) mb-2"
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
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition text-(--primary-text-color) bg-(--primary-bg-color) placeholder-(--bg-muted) ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
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
              className="block text-sm font-medium text-(--bg-muted) mb-2"
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
                    ? "border-red-500 focus:ring-red-500"
                    : "border-(--surface) focus:ring-(--secondary-bg-color)"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-(--bg-muted) hover:text-(--bg-muted) focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-(--bg-muted) mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                className={`w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition text-(--primary-text-color) bg-(--primary-bg-color) placeholder-(--bg-muted) ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-(--surface) focus:ring-(--secondary-bg-color)"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-(--bg-muted) hover:text-(--primary-text-color) hover:cursor-pointer  focus:outline-none "
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-(--secondary-bg-color) text-(--primary-bg-color) font-semibold py-2 px-4 rounded-lg  focus:outline-none focus:ring-2 focus:ring-(--secondary-bg-color) focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-95 transition-all duration-150 hover:cursor-pointer"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="mt-6 text-center">
          <p className="text-(--bg-muted)">
            Already have an account?{" "}
            <Link
              href="/login"
              onClick={onSwitchToLogin}
              className="text-(--secondary-bg-color) font-semibold hover:underline focus:outline-none focus:underline transition"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
