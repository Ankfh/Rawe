/**
 * Admin role detection service
 * Compares user email against ADMIN_EMAIL env variable
 */
export const checkIsAdmin = (email) => {
  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  if (!adminEmail || !email) return false;
  return email.toLowerCase() === adminEmail.toLowerCase();
};
