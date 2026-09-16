"use client";

import React from "react";
import Image from "next/image";
import { Template } from "@/types/template";
import { Button } from "@/components/ui/Button";
import { Eye, Check, Sparkles } from "lucide-react";

interface TemplateCardProps {
  template: Template;
  onPreview: (template: Template) => void;
  onSelect: (template: Template) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onPreview, onSelect }) => {
  return (
    <div className="bg-white rounded-3xl border border-black/5 shadow-card hover:shadow-subtle transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      {/* Top Visual Thumbnail / Preview Button */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
        <Image
          src={template.thumbnailUrl}
          alt={template.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onPreview(template)}
            className="gap-1.5 shadow-lg bg-white text-charcoal hover:bg-white/95"
          >
            <Eye className="w-3.5 h-3.5 text-crimson" /> Interactive Demo
          </Button>
        </div>

        {/* Featured Tag */}
        {template.isFeatured && (
          <span className="absolute top-3 left-3 bg-crimson text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3" /> Featured
          </span>
        )}

        {/* Category Tag */}
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-charcoal text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
          {template.category}
        </span>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-charcoal group-hover:text-crimson transition-colors line-clamp-1">
            {template.title}
          </h3>
          <p className="text-xs text-charcoal-muted mt-2 line-clamp-2 leading-relaxed">
            {template.description}
          </p>

          {/* Deliverables Checklist */}
          <div className="mt-4 pt-4 border-t border-black/5 space-y-1.5">
            {template.deliverables.slice(0, 3).map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-charcoal-muted">
                <Check className="w-3.5 h-3.5 text-crimson shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {template.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-semibold bg-canvas px-2.5 py-1 rounded-md text-charcoal-muted border border-black/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="mt-6 pt-4 border-t border-black/5 flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPreview(template)}
            className="w-1/2 text-xs py-2"
          >
            Live Demo
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onSelect(template)}
            className="w-1/2 text-xs py-2"
          >
            Select Template
          </Button>
        </div>
      </div>
    </div>
  );
};
