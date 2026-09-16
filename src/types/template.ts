export type TemplateCategory = "All" | "SaaS" | "E-Commerce" | "Mobile" | "Fintech" | "Agency" | "Portfolio";

export interface Template {
  id: string;
  title: string;
  slug: string;
  category: TemplateCategory;
  description: string;
  thumbnailUrl: string;
  demoUrl: string;
  figmaUrl?: string;
  techStack: string[];
  deliverables: string[];
  isFeatured?: boolean;
  accentColor: string;
}
