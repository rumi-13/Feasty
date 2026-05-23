/**
 * Shared localStorage utilities to prevent duplication
 */

// Clear all user-related localStorage entries
export const clearUserData = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('userType');
  localStorage.removeItem('userFullName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userPhoto');
};

// Clear all foodpartner-related localStorage entries
export const clearFoodPartnerData = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('userType');
  localStorage.removeItem('foodpartnerName');
  localStorage.removeItem('foodpartnerEmail');
  localStorage.removeItem('foodpartnerPhoto');
};

// Clear all session data (both user and foodpartner)
export const clearAllSessionData = () => {
  clearUserData();
  clearFoodPartnerData();
};
