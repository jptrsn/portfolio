//src/app/types/types.ts
import { JSX } from "react";

export interface ContactInfo {
  icon: JSX.Element;
  label: string;
  value: string;
  href: string;
}

export interface Skill {
  icon: JSX.Element;
  name: string;
  description: string;
  relatedTech?: string[];
}

export interface TechnicalUnderstanding {
  icon: JSX.Element;
  id: string;
  name: string;
  description: string;
}

export interface FeaturedProject {
  title: string;
  cover?: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
}