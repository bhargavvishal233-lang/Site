"use client";

import React, { useState, useMemo } from "react";
import { templatesData } from "@/data/templates";
import { Template, TemplateCategory } from "@/types/template";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { TemplateFilters } from "@/components/templates/TemplateFilters";
import { DevicePreviewModal } from "@/components/templates/DevicePreviewModal";
import { TemplateInquiryDrawer } from "@/components/templates/TemplateInquiryDrawer";
import { Badge } from "@/components/ui/Badge";
import { Footer } from "@/components/layout/Footer";

const categories: TemplateCategory[] = ["All", "SaaS", "E-Commerce", "Mobile", "Fintech", "Agency", "Portfolio"];

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filteredTemplates = useMemo(() => {
    return templatesData.filter((tpl) => {
      const matchesCategory = selectedCategory === "All" || tpl.category === selectedCategory;
      const matchesSearch =
        tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-canvas">
      {/* Page Header */}
      <section className="pt-12 pb-16 max-w-7xl mx-auto px-6 text-center">
        <Badge>UI/UX DESIGN GALLERY</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-charcoal mt-4">
          Curated Agency <span className="bracket-accent text-crimson">Design Templates</span>
        </h1>
        <p className="text-charcoal-muted mt-4 max-w-2xl mx-auto text-base">
          Explore interactive prototypes, production design systems, and responsive layouts. Choose a design to kickstart your next agency project.
        </p>
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <TemplateFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {filteredTemplates.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-black/5">
            <p className="text-charcoal-muted text-sm">No templates found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onPreview={(tpl) => setPreviewTemplate(tpl)}
                onSelect={(tpl) => setSelectedTemplate(tpl)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Interactive Responsive Viewport Modal */}
      <DevicePreviewModal
        template={previewTemplate}
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onSelect={(tpl) => setSelectedTemplate(tpl)}
      />

      {/* Slide-out Inquiry Drawer */}
      <TemplateInquiryDrawer
        template={selectedTemplate}
        isOpen={!!selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
      />

      <Footer />
    </div>
  );
}
