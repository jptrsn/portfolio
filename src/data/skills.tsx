import { Skill, SkillNode } from "@/types/types";
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

export const skillsData: SkillNode[] = [
  // Frontend Frameworks
  {
    id: 'react',
    label: 'React',
    category: 'framework',
    proficiencyLevel: 'advanced',
    relatedTo: ['typescript', 'javascript', 'frontend', 'nodejs', 'browser'],
    description: 'Component-based UI library'
  },
  {
    id: 'angular',
    label: 'Angular',
    category: 'framework',
    proficiencyLevel: 'expert',
    relatedTo: ['typescript', 'frontend', 'browser'],
    description: 'Full-featured frontend framework'
  },
  {
    id: 'vue2',
    label: 'Vue 2',
    category: 'framework',
    proficiencyLevel: 'advanced',
    relatedTo: ['javascript', 'frontend', 'browser'],
    description: 'Progressive JavaScript framework'
  },
  {
    id: 'jquery',
    label: 'jQuery',
    category: 'framework',
    proficiencyLevel: 'expert',
    relatedTo: ['javascript', 'frontend', 'browser', 'dom'],
    description: 'JavaScript library for DOM manipulation'
  },

  // Backend Frameworks & Runtime
  {
    id: 'nodejs',
    label: 'Node.js',
    category: 'platform',
    proficiencyLevel: 'expert',
    relatedTo: ['javascript', 'typescript', 'backend', 'express', 'api'],
    description: 'JavaScript runtime environment'
  },
  {
    id: 'express',
    label: 'Express',
    category: 'framework',
    proficiencyLevel: 'expert',
    relatedTo: ['nodejs', 'backend', 'api', 'rest'],
    description: 'Minimalist web framework for Node.js'
  },

  // Databases
  {
    id: 'postgresql',
    label: 'PostgreSQL',
    category: 'database',
    proficiencyLevel: 'advanced',
    relatedTo: ['sql', 'backend', 'database', 'relational'],
    description: 'Advanced open-source relational database'
  },
  {
    id: 'mysql',
    label: 'MySQL',
    category: 'database',
    proficiencyLevel: 'advanced',
    relatedTo: ['sql', 'backend', 'database', 'relational'],
    description: 'Popular open-source relational database'
  },
  {
    id: 'firestore',
    label: 'Firestore',
    category: 'database',
    proficiencyLevel: 'intermediate',
    relatedTo: ['nosql', 'backend', 'database', 'cloud'],
    description: 'Cloud-hosted NoSQL database'
  },
  {
    id: 'mongodb',
    label: 'MongoDB',
    category: 'database',
    proficiencyLevel: 'advanced',
    relatedTo: ['nosql', 'backend', 'database'],
    description: 'Document-oriented NoSQL database'
  },
  {
    id: 'redis',
    label: 'Redis',
    category: 'database',
    proficiencyLevel: 'intermediate',
    relatedTo: ['cache', 'backend', 'database', 'nosql'],
    description: 'In-memory data structure store'
  },

  // Languages
  {
    id: 'typescript',
    label: 'TypeScript',
    category: 'language',
    proficiencyLevel: 'expert',
    relatedTo: ['javascript', 'react', 'angular', 'nodejs', 'frontend', 'backend'],
    description: 'Typed superset of JavaScript'
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    category: 'language',
    proficiencyLevel: 'expert',
    relatedTo: ['frontend', 'backend', 'nodejs', 'browser'],
    description: 'Dynamic programming language'
  },
  {
    id: 'sql',
    label: 'SQL',
    category: 'language',
    proficiencyLevel: 'advanced',
    relatedTo: ['postgresql', 'mysql', 'database', 'relational'],
    description: 'Structured Query Language'
  },
  {
    id: 'golang',
    label: 'Go',
    category: 'language',
    proficiencyLevel: 'advanced',
    relatedTo: ['backend', 'api', 'microservices'],
    description: 'Statically typed compiled language'
  },

  // Tools
  {
    id: 'docker',
    label: 'Docker',
    category: 'tool',
    proficiencyLevel: 'advanced',
    relatedTo: ['devops', 'containerization', 'deployment'],
    description: 'Containerization platform'
  },
  {
    id: 'git',
    label: 'Git',
    category: 'tool',
    proficiencyLevel: 'expert',
    relatedTo: ['versioncontrol', 'collaboration'],
    description: 'Distributed version control system'
  },
  {
    id: 'yaml',
    label: 'YAML',
    category: 'language',
    proficiencyLevel: 'advanced',
    relatedTo: ['config', 'docker', 'devops'],
    description: 'Human-readable data serialization'
  },

  // Concepts & Categories
  {
    id: 'frontend',
    label: 'Frontend Development',
    category: 'concept',
    relatedTo: ['browser', 'ui', 'javascript', 'typescript'],
    description: 'Client-side development'
  },
  {
    id: 'backend',
    label: 'Backend Development',
    category: 'concept',
    relatedTo: ['api', 'database', 'server'],
    description: 'Server-side development'
  },
  {
    id: 'api',
    label: 'API Development',
    category: 'concept',
    relatedTo: ['rest', 'backend', 'nodejs', 'express'],
    description: 'Building application interfaces'
  },
  {
    id: 'database',
    label: 'Database Management',
    category: 'concept',
    relatedTo: ['backend', 'sql', 'nosql'],
    description: 'Data storage and retrieval'
  },
  {
    id: 'browser',
    label: 'Browser',
    category: 'platform',
    relatedTo: ['frontend', 'dom', 'javascript'],
    description: 'Web browser environment'
  },
  {
    id: 'rest',
    label: 'REST API',
    category: 'concept',
    relatedTo: ['api', 'http', 'backend'],
    description: 'RESTful web services'
  },
  {
    id: 'nosql',
    label: 'NoSQL',
    category: 'concept',
    relatedTo: ['mongodb', 'firestore', 'redis', 'database'],
    description: 'Non-relational databases'
  },
  {
    id: 'relational',
    label: 'Relational DB',
    category: 'concept',
    relatedTo: ['sql', 'postgresql', 'mysql', 'database'],
    description: 'Relational database systems'
  },
  {
    id: 'devops',
    label: 'DevOps',
    category: 'concept',
    relatedTo: ['docker', 'git', 'deployment'],
    description: 'Development operations practices'
  },
  {
    id: 'microservices',
    label: 'Microservices',
    category: 'concept',
    relatedTo: ['golang', 'api', 'docker', 'backend'],
    description: 'Distributed system architecture'
  },
  {
    id: 'dom',
    label: 'DOM',
    category: 'concept',
    relatedTo: ['browser', 'javascript', 'frontend'],
    description: 'Document Object Model'
  },
  {
    id: 'ui',
    label: 'UI Design',
    category: 'concept',
    relatedTo: ['frontend', 'react', 'angular', 'vue2'],
    description: 'User interface design'
  },
  {
    id: 'cache',
    label: 'Caching',
    category: 'concept',
    relatedTo: ['redis', 'backend', 'performance'],
    description: 'Data caching strategies'
  },
  {
    id: 'versioncontrol',
    label: 'Version Control',
    category: 'concept',
    relatedTo: ['git', 'collaboration'],
    description: 'Source code management'
  },
  {
    id: 'containerization',
    label: 'Containerization',
    category: 'concept',
    relatedTo: ['docker', 'devops', 'deployment'],
    description: 'Application containerization'
  },
  {
    id: 'cloud',
    label: 'Cloud Services',
    category: 'platform',
    relatedTo: ['firestore', 'deployment'],
    description: 'Cloud-based platforms'
  },
  {
    id: 'config',
    label: 'Configuration',
    category: 'concept',
    relatedTo: ['yaml', 'devops'],
    description: 'Application configuration'
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    category: 'concept',
    relatedTo: ['git', 'versioncontrol'],
    description: 'Team collaboration tools'
  },
  {
    id: 'deployment',
    label: 'Deployment',
    category: 'concept',
    relatedTo: ['docker', 'devops', 'cloud'],
    description: 'Application deployment'
  },
  {
    id: 'server',
    label: 'Server',
    category: 'platform',
    relatedTo: ['backend', 'nodejs', 'golang'],
    description: 'Server-side environment'
  },
  {
    id: 'http',
    label: 'HTTP',
    category: 'concept',
    relatedTo: ['rest', 'api', 'browser'],
    description: 'HTTP protocol'
  },
  {
    id: 'performance',
    label: 'Performance',
    category: 'concept',
    relatedTo: ['cache', 'redis', 'backend'],
    description: 'Application optimization'
  }
];