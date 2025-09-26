import { Skill } from "@/types/types";
import { AppWindow, Cloud, Code, Database, Waves } from "lucide-react";

export const skills: Skill[] = [
  {
    icon: <Code />,
    name: "Full Stack Development",
    description: "React, Node.js, GoLang, TypeScript, VueJS, Angular, NextJS, NestJS, Ionic, Python",
  },
  {
    icon: <AppWindow />,
    name: "Cross-Platform Compatibility",
    description: "Web, PWA, Android, iOS"
  },
  {
    icon: <Database />,
    name: "Database Schema",
    description: "PostgreSQL, MongoDB, MySQL, Redis",
  },
  {
    icon: <Cloud />,
    name: "Continuous Integration / Continuous Delivery",
    description: "GitHub Actions, Docker, Docker Compose",
    relatedTech: []
  },
  {
    icon: <Waves />,
    name: "Data Streaming",
    description: "Data Serialization, Media Synchronization, Sockets, WebRTC",
  },
];