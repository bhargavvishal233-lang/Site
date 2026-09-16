"use client";

import React from "react";
import { Search } from "lucide-react";
import { TemplateCategory } from "@/types/template";

interface TemplateFiltersProps {
  categories: TemplateCategory[];
  selectedCategory: TemplateCategory;
  onSelectCategory: (category: TemplateCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TemplateFilters: React.FC<TemplateFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-crimson text-white shadow-sm"
                : "bg-white text-charcoal-muted hover:text-charcoal border border-black/5 hover:bg-canvas"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative w-full md:w-72">
        <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search templates, tech..."
          className="w-full bg-white border border-black/10 rounded-full pl-10 pr-4 py-2 text-xs text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:border-crimson transition-colors shadow-sm"
        />
      </div>
    </div>
  );
};
