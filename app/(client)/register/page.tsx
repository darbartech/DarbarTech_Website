"use client";

import { useState } from "react";

import { Eye, EyeOff, ArrowRight } from "lucide-react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import HeroSectionForPages from "../components/common/HeroSectionForPages";

import Navbar from "../components/common/Navbar";

import Footer from "../components/common/Footer";

import { useToastStore } from "@/components/common/toast-store";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addToast = useToastStore((s) => s.addToast);
  const router = useRouter();

  // -----------------------------
  // Validate Form
  // -----------------------------

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName =
        "First name must be at least 2 characters";
    } else if (formData.firstName.trim().length > 50) {
      newErrors.firstName =
        "First name must not exceed 50 characters";
    }

    // Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName =
        "Last name must be at least 2 characters";
    } else if (formData.lastName.trim().length > 50) {
      newErrors.lastName =
        "Last name must not exceed 50 characters";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone
    const phoneRegex = /^\+?[0-9\s-]{7,20}$/;

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Address
    if (formData.address.trim().length > 255) {
      newErrors.address =
        "Address must not exceed 255 characters";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters";
    } else if (formData.password.length > 128) {
      newErrors.password =
        "Password must not exceed 128 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one number";
    } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one special character";
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // -----------------------------
  // Handle Input Change
  // -----------------------------

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // -----------------------------
  // Submit Form
  // -----------------------------

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Send data expected by the signup API
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // The signup API expects a single `name` field.
          name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim() || null,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle duplicate email
        if (response.status === 409) {
          setErrors({
            email: result.message || "Email already exists",
          });

          addToast(
            result.message || "Email already exists",
            "error"
          );

          return;
        }

        // Handle validation errors
        addToast(
          result.message || "Unable to create account",
          "error"
        );

        return;
      }

      // Signup successful
      addToast(
        result.message || "Account created successfully",
        "success"
      );

      // Redirect to login
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      console.error("Signup error:", error);

      addToast(
        "Unable to connect to the server. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main
        className="
          space-y-3
          w-full
          mx-auto
          px-4
          py-5
          sm:px-6
          sm:py-14
          md:space-y-5
          md:px-10
          md:py-10
          lg:w-full
          lg:flex
          lg:items-center
          lg:justify-around
          lg:px-20
          xl:px-30
        "
      >
        <HeroSectionForPages title="Register" />

        {/* Form Section */}
        <section
          className="
            bg-(--primary-bg-color)
            rounded-lg
            shadow-lg
            px-5
            py-4
            w-full
            lg:w-xl
          "
        >
          <h2
            className="
              text-3xl
              font-bold
              text-(--primary-text-color)
              mb-2
              text-center
            "
          >
            Create Account
          </h2>

          <p className="text-(--bg-muted) text-center mb-8">
            Join us today to get started
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name and Last Name side by side */}
            <div
              className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
              "
            >
              <div>
                <label
                  htmlFor="firstName"
                  className="
                    block
                    text-sm
                    font-medium
                    text-(--bg-muted)
                    mb-2
                  "
                >
                  First Name
                </label>

                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className={`
                    w-full
                    px-4
                    py-2
                    border
                    rounded-lg
                    focus:outline-none
                    focus:ring-2
                    transition
                    text-(--primary-text-color)
                    bg-(--primary-bg-color)
                    placeholder-(--bg-muted)
                    ${
                      errors.firstName
                        ? "border-red-500 focus:ring-red-500"
                        : "border-(--surface) focus:ring-(--secondary-bg-color)"
                    }
                  `}
                />

                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="
                    block
                    text-sm
                    font-medium
                    text-(--bg-muted)
                    mb-2
                  "
                >
                  Last Name
                </label>

                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className={`
                    w-full
                    px-4
                    py-2
                    border
                    rounded-lg
                    focus:outline-none
                    focus:ring-2
                    transition
                    text-(--primary-text-color)
                    bg-(--primary-bg-color)
                    placeholder-(--bg-muted)
                    ${
                      errors.lastName
                        ? "border-red-500 focus:ring-red-500"
                        : "border-(--surface) focus:ring-(--secondary-bg-color)"
                    }
                  `}
                />

                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="
                  block
                  text-sm
                  font-medium
                  text-(--bg-muted)
                  mb-2
                "
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
                className={`
                  w-full
                  px-4
                  py-2
                  border
                  rounded-lg
                  focus:outline-none
                  focus:ring-2
                  transition
                  text-(--primary-text-color)
                  bg-(--primary-bg-color)
                  placeholder-(--bg-muted)
                  ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-(--surface) focus:ring-(--secondary-bg-color)"
                  }
                `}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone and Address side by side */}
            <div
              className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
              "
            >
              <div>
                <label
                  htmlFor="phone"
                  className="
                    block
                    text-sm
                    font-medium
                    text-(--bg-muted)
                    mb-2
                  "
                >
                  Phone Number
                </label>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+977 98XXXXXXXX"
                  className={`
                    w-full
                    px-4
                    py-2
                    border
                    rounded-lg
                    focus:outline-none
                    focus:ring-2
                    transition
                    text-(--primary-text-color)
                    bg-(--primary-bg-color)
                    placeholder-(--bg-muted)
                    ${
                      errors.phone
                        ? "border-red-500 focus:ring-red-500"
                        : "border-(--surface) focus:ring-(--secondary-bg-color)"
                    }
                  `}
                />

                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="
                    block
                    text-sm
                    font-medium
                    text-(--bg-muted)
                    mb-2
                  "
                >
                  Address
                </label>

                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Lalitpur, Nepal"
                  className={`
                    w-full
                    px-4
                    py-2
                    border
                    rounded-lg
                    focus:outline-none
                    focus:ring-2
                    transition
                    text-(--primary-text-color)
                    bg-(--primary-bg-color)
                    placeholder-(--bg-muted)
                    ${
                      errors.address
                        ? "border-red-500 focus:ring-red-500"
                        : "border-(--surface) focus:ring-(--secondary-bg-color)"
                    }
                  `}
                />

                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="
                  block
                  text-sm
                  font-medium
                  text-(--bg-muted)
                  mb-2
                "
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
                  className={`
                    w-full
                    px-4
                    py-2
                    pr-14
                    border
                    rounded-lg
                    focus:outline-none
                    focus:ring-2
                    transition
                    text-(--primary-text-color)
                    bg-(--primary-bg-color)
                    placeholder-(--bg-muted)
                    ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-(--surface) focus:ring-(--secondary-bg-color)"
                    }
                  `}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="
                    absolute
                    right-1.5
                    top-1/2
                    z-10
                    flex
                    h-10
                    w-10
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-lg
                    text-(--bg-muted)
                    transition
                    hover:text-(--primary-text-color)/70
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-(--secondary-bg-color)
                    hover:cursor-pointer
                    touch-manipulation
                  "
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="
                  block
                  text-sm
                  font-medium
                  text-(--bg-muted)
                  mb-2
                "
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                  className={`
                    w-full
                    px-4
                    py-2
                    pr-14
                    border
                    rounded-lg
                    focus:outline-none
                    focus:ring-2
                    transition
                    text-(--primary-text-color)
                    bg-(--primary-bg-color)
                    placeholder-(--bg-muted)
                    ${
                      errors.confirmPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-(--surface) focus:ring-(--secondary-bg-color)"
                    }
                  `}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="
                    absolute
                    right-1.5
                    top-1/2
                    z-10
                    flex
                    h-10
                    w-10
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-lg
                    text-(--bg-muted)
                    transition
                    hover:text-(--primary-text-color)/70
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-(--secondary-bg-color)
                    hover:cursor-pointer
                    touch-manipulation
                  "
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full
                btn-primary-hover-state
                font-semibold
                py-2
                px-4
                rounded-lg
                focus:outline-none
                focus:ring-2
                focus:ring-(--secondary-bg-color)
                focus:ring-offset-2
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {isLoading
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-6 text-center">
            <p
              className="
                text-(--bg-muted)
                flex
                items-center
                justify-center
                gap-2
              "
            >
              Already have an account?{" "}
              <Link
                href="/login"
                className="
                  text-(--secondary-bg-color)
                  font-semibold
                  focus:outline-none
                  group
                  flex
                  items-center
                "
              >
                Sign In

                <ArrowRight
                  size={18}
                  className="arrow"
                />
              </Link>
            </p>
          </div>
        </section>

        {/* Clearance for fixed mobile bottom nav */}
        <div
          className="h-24 lg:hidden"
          aria-hidden="true"
        />
      </main>

      <Footer />
    </>
  );
}