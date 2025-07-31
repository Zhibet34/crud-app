import React, { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface CardSearchProps {
    onSearch: (searchTerm: string) => void;
}

const CardSearch: React.FC<CardSearchProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 transition-all duration-300 hover:shadow-lg">
  <form onSubmit={handleSubmit} className="space-y-4">
    <div className="space-y-2">
      <Label 
        htmlFor="card-search" 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Search Date Ideas
      </Label>
      <div className="relative">
        <Input
          id="card-search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for restaurants, parks, activities..."
          className="w-full pl-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
        />
        <svg
          className="absolute right-3 top-3 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
    <Button
      type="submit"
      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
      <span>Find Dates</span>
    </Button>
  </form>
</div>
    );
};

export default CardSearch;