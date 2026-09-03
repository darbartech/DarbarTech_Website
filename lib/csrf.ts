const CSRF_TOKEN_KEY = "csrf_token";

function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function getCsrfToken(): string {
  if (typeof window === "undefined") return "";
  let token = sessionStorage.getItem(CSRF_TOKEN_KEY);
  if (!token) {
    token = generateToken();
    sessionStorage.setItem(CSRF_TOKEN_KEY, token);
  }
  return token;
}

export function csrfHeaders(): Record<string, string> {
  return { "X-CSRF-Token": getCsrfToken() };
}

export function clearCsrfToken(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(CSRF_TOKEN_KEY);
  }
}
