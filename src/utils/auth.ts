// Authentication utilities

export const logout = () => {
  // Clear cookies
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
  document.cookie = "userEmail=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
  document.cookie =
    "userCompany=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
  document.cookie = "vendorId=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";

  // Clear localStorage
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userCompany");
  localStorage.removeItem("vendorId");

  // Redirect to login
  window.location.href = "/login";
};

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;

  // Check localStorage first (client-side)
  const localAuth = localStorage.getItem("isAuthenticated");

  // Check cookie as backup
  const cookieAuth = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  return localAuth === "true" || !!cookieAuth;
};

export const getUserEmail = (): string | null => {
  if (typeof window === "undefined") return null;

  // Try localStorage first
  const localEmail = localStorage.getItem("userEmail");
  if (localEmail) return localEmail;

  // Try cookie as backup
  const cookieEmail = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userEmail="))
    ?.split("=")[1];

  return cookieEmail || null;
};

export const getUserCompany = (): string | null => {
  if (typeof window === "undefined") return null;

  // Try localStorage first
  const localCompany = localStorage.getItem("userCompany");
  if (localCompany) return localCompany;

  // Try cookie as backup
  const cookieCompany = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userCompany="))
    ?.split("=")[1];

  return cookieCompany || null;
};

export const getVendorId = (): string | null => {
  if (typeof window === "undefined") return null;

  // Try localStorage first
  const localVendorId = localStorage.getItem("vendorId");
  if (localVendorId) return localVendorId;

  // Try cookie as backup
  const cookieVendorId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("vendorId="))
    ?.split("=")[1];

  return cookieVendorId || null;
};

export const setVendorId = (vendorId: string): void => {
  if (typeof window === "undefined") return;

  // Store in cookie (for middleware)
  document.cookie = `vendorId=${vendorId}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days

  // Also store in localStorage for client-side access
  localStorage.setItem("vendorId", vendorId);
};

export const getCurrentUser = () => {
  return {
    email: getUserEmail(),
    company: getUserCompany(),
    vendorId: getVendorId(),
    isAuthenticated: isAuthenticated(),
  };
};
