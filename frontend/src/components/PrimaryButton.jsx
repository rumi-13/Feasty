import React from 'react';

const PrimaryButton = ({ children, className = '', disabled = false, type = 'button', ...props }) => {
  const base = 'group relative flex w-full justify-center rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-200';
  return (
    <button type={type} disabled={disabled} className={`${base} ${disabled ? 'opacity-70 cursor-not-allowed' : ''} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default PrimaryButton;
