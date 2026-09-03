"use client";

import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/(client)/components/common/Navbar";
import Footer from "@/app/(client)/components/common/Footer";
import HeroSectionForPages from "@/app/(client)/components/HeroSectionForPages";
import { authService } from "@/lib/auth/auth-service";
import { useAuthStore } from "@/lib/auth/auth-store";
import { useToastStore } from "@/components/common/toast-store";

interface FormErrors {
  email?: string;
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuthStore();
  const { requestPasswordReset } = authService;
  const { addToast } = useToastStore();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const result = await requestPasswordReset(email);
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
        <HeroSectionForPages title="Forgot Password" />

        <section className="bg-(--primary-bg-color) rounded-lg shadow-lg px-5 py-4 w-full lg:w-xl">
          <h2 className="text-3xl font-bold text-(--primary-text-color) mb-2 text-center">
            Reset Your Password
          </h2>
          <p className="text-(--bg-muted) text-center mb-8">
            Enter your email address and we&apos;ll send you a link to reset your
            password
          </p>

          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm font-medium">
                  If an account exists with this email, a reset link has been
                  sent.
                </p>
              </div>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-(--secondary-bg-color) font-semibold hover:underline"
              >
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-(--bg-muted) mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-(--bg-muted)"
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors((prev) => ({ ...prev, email: undefined }));
                      }
                    }}
                    placeholder={user?.email || "john@example.com"}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition text-(--primary-text-color) bg-white placeholder-(--bg-muted) ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-(--surface) focus:ring-(--secondary-bg-color)"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-(--secondary-bg-color) text-(--primary-bg-color) font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--secondary-bg-color) focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-95 transition-all duration-150 hover:cursor-pointer"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
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
