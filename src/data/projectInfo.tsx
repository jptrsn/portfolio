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
    title: "OwnTone Sync",
    cover: "/project-assets/owntone-sync/screenshot_4.png",
    description: "A mobile app that recreates the iTunes/iPod sync experience by synchronizing your music collection from an OwnTone server to your Android device for offline playback.",
    tech: [
      "Flutter",
      "Dart",
      "Kotlin",
      "Android",
      "REST API"
    ],
    link: "/projects/owntone-sync",
    codeberg: "https://codeberg.org/edu_coder/owntone-sync",
    liveUrl: "https://edu_coder.codeberg.page/owntone-sync/"
  },
  {
    title: "Quaid Dot Army",
    cover: "/project-assets/quaidarmy/qa_banner.png",
    description: "A fully-accessible podcast fan website and player, with AI-generated transcriptions synced to remote audio. Because no one had bought the domain yet.",
    tech: ["Next.js", "Python", "Docker", "Whisper"],
    link: "/projects/quaid-army",
    liveUrl: "https://quaid.army"
  },
  // {
  //   title: "S-G-H",
  //   cover: "/project-assets/sushigloryhole/icon_512.png",
  //   description: "Cross-Platform codebase with location and map interactivity, inspired by the music of The Lonely Island. They pitched the app idea in their music video, so I had to build it.",
  //   tech: ["Angular", "Ionic", "GitHub Actions"],
  //   link: "/projects/sushi-glory-hole",
  //   liveUrl: "https://sushigloryhole.app"
  // }

];