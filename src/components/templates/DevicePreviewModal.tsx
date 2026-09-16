"use client";

import React, { useState } from "react";
import { Template } from "@/types/template";
import { Button } from "@/components/ui/Button";
import { Monitor, Tablet, Smartphone, ExternalLink, X, RotateCw } from "lucide-react";

interface DevicePreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: Template) => void;
}

type DeviceMode = "desktop" | "tablet" | "mobile";

export const DevicePreviewModal: React.FC<DevicePreviewModalProps> = ({
  template,
  isOpen,
  onClose,
  onSelect,
}) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [key, setKey] = useState(0);

  if (!isOpen || !template) return null;

  const deviceWidths = {
    desktop: "w-full max-w-6xl",
    tablet: "w-[768px]",
    mobile: "w-[375px]",
  };

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <header className="h-16 px-6 bg-charcoal text-white flex items-center justify-between border-b border-white/10 shrink-0">
        {/* Template Title & Badge */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-white truncate max-w-xs">{template.title}</span>
          <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider bg-crimson px-2.5 py-0.5 rounded-full">
            {template.category}
          </span>
        </div>

        {/* Viewport Switcher Controls */}
        <div className="flex items-center bg-white/10 p-1 rounded-full border border-white/10">
          <button
            onClick={() => setDeviceMode("desktop")}
            className={`p-1.5 rounded-full transition-colors ${
              deviceMode === "desktop" ? "bg-crimson text-white" : "text-white/70 hover:text-white"
            }`}
            title="Desktop View (1440px)"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceMode("tablet")}
            className={`p-1.5 rounded-full transition-colors ${
              deviceMode === "tablet" ? "bg-crimson text-white" : "text-white/70 hover:text-white"
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceMode("mobile")}
            className={`p-1.5 rounded-full transition-colors ${
              deviceMode === "mobile" ? "bg-crimson text-white" : "text-white/70 hover:text-white"
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              onClose();
              onSelect(template);
            }}
            className="text-xs px-4"
          >
            Select Template
          </Button>

          <a
            href={template.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Open Direct
          </a>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Viewport Workspace */}
      <div className="flex-1 overflow-auto bg-neutral-900 p-4 sm:p-6 flex items-center justify-center">
        <div
          className={`h-full max-h-[820px] ${deviceWidths[deviceMode]} bg-white rounded-2xl shadow-2xl border border-white/20 flex flex-col overflow-hidden transition-all duration-300`}
        >
          {/* Simulated Browser Address Bar */}
          <div className="h-10 bg-neutral-100 border-b border-black/5 px-4 flex items-center justify-between text-xs text-charcoal-muted shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />
            </div>
            <div className="bg-white px-4 py-1 rounded-md text-[11px] font-mono border border-black/5 text-charcoal truncate max-w-sm">
              {template.demoUrl}
            </div>
            <button onClick={() => setKey((k) => k + 1)} className="hover:text-charcoal">
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Live Screen Content Simulation */}
          <div className="flex-1 bg-canvas overflow-y-auto relative p-8">
            <div className="max-w-2xl mx-auto text-center py-12">
              <span className="text-xs font-bold uppercase tracking-wider text-crimson bg-crimson-light px-3 py-1 rounded-full">
                Interactive Template Preview
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-charcoal mt-4">{template.title}</h2>
              <p className="text-sm text-charcoal-muted mt-3">{template.description}</p>

              <div className="mt-8 p-6 bg-white rounded-2xl shadow-card border border-black/5 text-left space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal">Included Deliverables:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {template.deliverables.map((item) => (
                    <div key={item} className="text-xs text-charcoal font-medium">
                      • {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    onClose();
                    onSelect(template);
                  }}
                >
                  Choose This Design For My Agency
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
