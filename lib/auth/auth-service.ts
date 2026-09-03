import type { User, RegisterData, AuthResponse } from "./types";

const MOCK_USERS: (User & { password: string })[] = [
  {
    id: "usr-001",
    name: "Super Admin",
    email: "admin@darbartech.com",
    role: "superadmin",
    password: "Admin@123",
  },
  {
    id: "usr-002",
    name: "Ops Admin",
    email: "ops@darbartech.com",
    role: "admin",
    password: "Admin@123",
  },
  {
    id: "usr-003",
    name: "Sarah M.",
    email: "sarah@darbartech.com",
    role: "teacher",
    password: "Teacher@123",
  },
  {
    id: "usr-004",
    name: "Roban Ghimire",
    email: "roban.ghimire@darbartech.com",
    role: "student",
    password: "Student@123",
  },
];

function simulateDelay(ms = 800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    await simulateDelay();

    const found = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!found || found.password !== password) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const { password: _pw, ...user } = found;

    return {
      success: true,
      message: "Login successful.",
      user,
    };
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    await simulateDelay();

    const exists = MOCK_USERS.some(
      (u) => u.email.toLowerCase() === data.email.toLowerCase()
    );

    if (exists) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: data.fullName,
      email: data.email,
      role: "student",
    };

    MOCK_USERS.push({ ...newUser, password: data.password });

    return {
      success: true,
      message: "Registration successful. Please log in.",
      user: newUser,
    };
  },

  logout(): void {
    // In a real app, this would invalidate the server session.
  },

  async requestPasswordReset(_email: string): Promise<AuthResponse> {
    await simulateDelay();

    return {
      success: true,
      message: "If an account exists with this email, a reset link has been sent.",
    };
  },

  async resetPassword(_token: string, _newPassword: string): Promise<AuthResponse> {
    await simulateDelay();

    return {
      success: true,
      message: "Password has been reset successfully.",
    };
  },

  async changePassword(
    _currentPassword: string,
    _newPassword: string
  ): Promise<AuthResponse> {
    await simulateDelay();

    return {
      success: true,
      message: "Password updated successfully.",
    };
  },
};
