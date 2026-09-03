"use client";

import { AuthProvider } from "@/lib/auth/auth-context";
import ToastContainer from "./Toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <ToastContainer />
    </AuthProvider>
  );
}
