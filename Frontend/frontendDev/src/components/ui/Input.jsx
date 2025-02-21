import React from "react";

export default function Input({ id, type = "text", placeholder, className = "" }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
    />
  );
}
