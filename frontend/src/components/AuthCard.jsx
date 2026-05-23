import React from 'react';

// Minimal presentational wrapper used across auth pages to keep markup consistent
const AuthCard = ({ className = '', children, ...props }) => {
  const base = 'w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100';
  return (
    <div className={`${base} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default AuthCard;
