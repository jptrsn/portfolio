export interface Summary {
  title: string;
  description: string;
  icon?: string;
  imageFolderName?: string;
  images?: string[];
}

export const Skills: Summary[] = [
  {
    title: 'Google Cloud Platform',
    description: 'James has experience using Google Cloud Platform to develop and deploy full stack micro-service architecture web applications for customers',
    icon: 'assets/icons/cloud_generic.svg'
  },
  {
    title: 'Full Stack Development',
    description: 'James has experience working as a full stack developer in the Angular/NestJS frameworks within Javascript and NodeJS.',
    icon: 'assets/icons/stack.svg'
  },
  {
    title: 'Material Design',
    description: 'Design rules and approach follow the Material Design specification, but are extended or modified where appropriate.',
    icon: 'assets/icons/material.svg'
  },
  {
    title: 'Chrome Browser Extensions',
    description: 'James has developed, deployed, debugged, and maintained a large-scale browser extension product integration.',
    icon: 'assets/icons/chrome.svg'
  },
  {
    title: 'Redis',
    description: 'James has architected applications that implement a Redis caching layer to improve performance and reduce server load.',
    icon: 'assets/icons/redis-cube.svg'
  }
];

export const Principles: Summary[] = [
  {
    title: 'Responsive Design',
    description: 'Applications are built to work across all devices and view ports'
  },
  {
    title: 'Scalability',
    description: 'James writes code to be performant, both for at-keyboard interactions, and performing mass operations at scale.'
  },
  {
    title: 'Communication',
    description: 'As a former educator, James is a skilled communicator and facilitator of communication, both synchronous and asynchronous.'
  },
  {
    title: 'Collaboration',
    description: `In addition to his extensive experience collaborating with colleagues remotely on both sides of the Atlantic, James has 
    a keen understanding of the nature of group dynamics and interpersonal relationship management.`
  }
]

export const Interests: Summary[] = [
  {
    title: 'Self hosting',
    description: 'Within the dark reaches of James\' basement lies a 2011 HP desktop computer running Docker, hosting a revolving door of images he finds interesting'
  },
  {
    title: 'Home Automation',
    description: 'James runs his own home automation server, and has built several devices to power his own smart home'
  },
  {
    title: 'Electronics',
    description: 'James designs and builds devices to augment his smart home. He has also retrofit existing consumer devices such as window air conditioners to connect to his home automation server.'
  }
]