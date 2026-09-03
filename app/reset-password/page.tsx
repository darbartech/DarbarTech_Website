"use client";

import { useState, Suspense } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/app/(client)/components/common/Navbar";
import Footer from "@/app/(client)/components/common/Footer";
import HeroSectionForPages from "@/app/(client)/components/HeroSectionForPages";
import { useAuthStore } from "@/lib/auth/auth-store";
import { useToastStore } from "@/components/common/toast-store";
import { authService } from "@/lib/auth/auth-service";

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

function ResetPasswordForm() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuthStore();
  const { addToast } = useToastStore();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

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
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const result = await authService.resetPassword(
          token,
          formData.password
        );
        if (result.success) {
          setIsSubmitted(true);
          addToast(result.message, "success");
        } else {
          addToast(result.message, "error");
        }
      } catch {
        addToast("An error occurred. Please try again.", "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <main className="space-y-3 w-full mx-auto px-4 py-5 sm:px-6 sm:py-14 md:space-y-5 md:px-10 md:py-10 lg:w-full lg:flex lg:items-center lg:justify-around lg:px-20 xl:px-30">
        <HeroSectionForPages title="Reset Password" />

        <section className="bg-(--primary-bg-color) rounded-lg shadow-lg px-5 py-4 w-full lg:w-xl">
          <h2 className="text-3xl font-bold text-(--primary-text-color) mb-2 text-center">
            Set a New Password
          </h2>
          <p className="text-(--bg-muted) text-center mb-8">
            Enter a new password for your account
          </p>
          {user && (
            <p className="text-(--bg-muted) text-center text-sm -mt-6 mb-8">
              Resetting password for <span className="font-medium text-(--primary-text-color)">{user.email}</span>
            </p>
          )}

          {!token ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
              <p className="text-red-600 text-sm font-medium">
                Invalid or missing reset token. Please request a new reset link.
              </p>
              <Link
                href="/forgot-password"
                className="mt-3 inline-flex items-center gap-2 text-(--secondary-bg-color) font-semibold hover:underline"
              >
                <ArrowLeft size={16} />
                Request Reset Link
              </Link>
            </div>
          ) : isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm font-medium">
                  Your password has been reset successfully. You can now sign in
                  with your new password.
                </p>
              </div>
              <Link
                href="/login"
                className="inline-block w-full bg-(--secondary-bg-color) text-(--primary-bg-color) font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-bg-color) focus:ring-offset-2 hover:scale-95 transition-all duration-150 hover:cursor-pointer"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-(--bg-muted) mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                    className={`w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition text-(--primary-text-color) bg-white placeholder-(--bg-muted) ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-(--surface) focus:ring-(--secondary-bg-color)"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-(--bg-muted) hover:text-(--primary-text-color) hover:cursor-pointer focus:outline-none"
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
                    placeholder="Confirm new password"
                    className={`w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition text-(--primary-text-color) bg-white placeholder-(--bg-muted) ${
                      errors.confirmPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-(--surface) focus:ring-(--secondary-bg-color)"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-(--bg-muted) hover:text-(--primary-text-color) hover:cursor-pointer focus:outline-none"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-(--secondary-bg-color) text-(--primary-bg-color) font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-bg-color) focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-95 transition-all duration-150 hover:cursor-pointer"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          {/* Back to Login */}
          {!isSubmitted && (
            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-(--secondary-bg-color) font-semibold hover:underline"
              >
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-(--bg-muted)">Loading...</p>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
