// src/components/SearchBar.js
import React from "react";

const SearchBar = ({ onChange }) => {
  return (
    <input
      type="text"
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter search term..."
      className="w-full max-w-md px-6 py-3 border rounded-xl text-lg shadow-sm"
    />
  );
};

export default SearchBar;
