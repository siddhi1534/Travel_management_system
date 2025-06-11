// src/components/ui/input.jsx
import React from "react";
import "./input.css";

export function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      className="custom-input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
