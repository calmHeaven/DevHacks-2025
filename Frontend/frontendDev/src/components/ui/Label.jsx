import React from "react";

export default function Label({ htmlFor, children }) {
  return <label htmlFor={htmlFor} className="block text-gray-300 font-medium mb-1">{children}</label>;
}
