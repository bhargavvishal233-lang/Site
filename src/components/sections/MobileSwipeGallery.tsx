"use client";

import React from "react";
import Image from "next/image";

const images = [
  "/template_advisoral_1.png",
  "/template_advisoral_2.png",
  "/template_advisoral_3.png",
  "/template_advisoral_4.png",
  "/template_advisoral_5.png",
  "/template_advisoral_6.png"
];

export const MobileSwipeGallery: React.FC = () => {
  return (
    <section className="py-16 bg-[#FAF6F5] overflow-hidden">
      <div className="px-6 mb-8 text-center">
        <h2 className="text-3xl font-serif text-charcoal leading-tight">
          With decades of experience, we specialize in turning ideas into well-designed structures that stand the test of time.
        </h2>
      </div>

      {/* Swipeable Horizontal Gallery */}
      <div className="w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 px-6 flex gap-4">
        {images.map((src, idx) => (
          <div 
            key={idx}
            className="relative flex-none w-[85vw] h-[60vw] rounded-xl overflow-hidden shadow-xl snap-center bg-charcoal"
          >
            <Image
              src={src}
              alt={`Agency work ${idx + 1}`}
              fill
              className="object-cover object-top"
              sizes="85vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
