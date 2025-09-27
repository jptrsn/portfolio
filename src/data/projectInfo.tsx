import { FeaturedProject } from "@/types/types";

export const sideProjects: FeaturedProject[] = [
    {
      title: "Zip Captions",
      cover: "projects/zipcaptions/screenshot.png",
      description: "A free, open-source, and browser-based captioning application built with a modern TypeScript-driven stack and a commitment to accessibility, allowing users to generate captions directly in their browser at no cost.",
      tech: ["Angular", "Node.js", "MongoDB", "Azure" ],
      link: "/projects/zip-captions",
      github: "https://github.com/jptrsn/zip-captions"
    },
    {
      title: "Quaid Dot Army",
      cover: "projects/quaidarmy/qa_banner.png",
      description: "A fully-accessible podcast fan website and player, with AI-generated transcriptions synced to remote audio",
      tech: ["Next.js", "Python", "Docker", "Whisper"],
      link: "/projects/quaid-army",
      liveUrl: "https://quaid.army"
    },
    {
      title: "S-G-H",
      cover: "projects/sushigloryhole/icon_512.png",
      description: "Cross-Platform codebase with location and map interactivity, inspired by the music of The Lonely Island",
      tech: ["Angular", "Ionic", "GitHub Actions"],
      link: "/projects/sushi-glory-hole",
      liveUrl: "https://sushigloryhole.app"
    }
  ];