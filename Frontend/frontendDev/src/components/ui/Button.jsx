import React from "react";

export default function Button({ children, onClick, type = "button", variant = "default", className = "" }) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition";
  const variants = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    outline: "border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white",
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
