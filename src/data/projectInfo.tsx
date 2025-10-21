import { FeaturedProject } from "@/types/types";

export const sideProjects: FeaturedProject[] = [
  {
    title: "Zip Captions",
    cover: "/project-assets/zipcaptions/screenshot.png",
    description: "A free, open-source, and browser-based captioning application built with a modern TypeScript-driven stack and a commitment to accessibility, allowing users to generate captions directly in their browser at no cost.",
    tech: ["Angular", "Node.js", "MongoDB", "Azure" ],
    link: "/projects/zip-captions",
    github: "https://github.com/jptrsn/zip-captions",
    liveUrl: "https://zipcaptions.app"
  },
  {
    title: "Quaid Dot Army",
    cover: "/project-assets/quaidarmy/qa_banner.png",
    description: "A fully-accessible podcast fan website and player, with AI-generated transcriptions synced to remote audio. Because no one had bought the domain yet.",
    tech: ["Next.js", "Python", "Docker", "Whisper"],
    link: "/projects/quaid-army",
    liveUrl: "https://quaid.army"
  },
  {
    title: "S-G-H",
    cover: "/project-assets/sushigloryhole/icon_512.png",
    description: "Cross-Platform codebase with location and map interactivity, inspired by the music of The Lonely Island. They pitched the app idea in their music video, so I had to build it.",
    tech: ["Angular", "Ionic", "GitHub Actions"],
    link: "/projects/sushi-glory-hole",
    liveUrl: "https://sushigloryhole.app"
  }
];