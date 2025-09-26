import { FeaturedProject } from "@/types/types";

export const featuredProjects: FeaturedProject[] = [
    {
      title: "Zip Captions",
      cover: "projects/zipcaptions/screenshot.png",
      description: "A free, open-source, and browser-based captioning application built with a modern TypeScript-driven stack and a commitment to accessibility, allowing users to generate captions directly in their browser at no cost.",
      tech: ["Angular", "Node.js", "MongoDB", "Azure", "Docker"],
      link: "/projects/zip-captions",
      github: "https://github.com/jptrsn/zip-captions"
    },
    {
      title: "Real-time Analytics Dashboard",
      description: "Live data visualization with WebSocket integration and machine learning insights",
      tech: ["Next.js", "Python", "D3.js", "Docker"],
      link: "/projects/analytics-dashboard",
      github: "https://github.com/yourusername/analytics"
    },
    {
      title: "Developer Tools CLI",
      description: "Command-line toolkit used by 500+ developers for workflow automation",
      tech: ["Go", "CLI", "Docker", "GitHub Actions"],
      link: "/projects/dev-tools-cli",
      github: "https://github.com/yourusername/devtools"
    }
  ];