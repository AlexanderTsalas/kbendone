import { LucideIcon } from "lucide-react";

export type Language = 'el' | 'en' | 'de' | 'fr' | 'ru';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  category: ServiceCategory;
}

export type ServiceCategory = 'face' | 'body' | 'breast' | 'non-invasive' | 'reconstructive' | 'skin' | 'combined' | 'men';

export interface NavItem {
  label: string;
  href: string;
  action?: 'home' | 'services' | 'doctor-bio' | 'faq' | 'blog';
}

export interface SubCategory {
  id: string;
  label: string;
  items: ProcedureDetail[];
}

export interface CategoryData {
  id: ServiceCategory;
  label: string;
  subCategories?: SubCategory[]; // For nested structures
  items?: ProcedureDetail[]; // For flat structures
}

export interface ProcedureStep {
  title: string;
  description: string;
}

// Data structure for the detailed service view
export interface ProcedureDetail {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  recovery: string;
  complications?: string;
  steps?: ProcedureStep[]; // Added steps for localization
  images?: {
    before: string;
    after: string;
  }[];
}

export interface GalleryCase {
  id: string;
  title: string;
  category: ServiceCategory;
  procedure: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[]; // Array of paragraphs for easier rendering
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
}