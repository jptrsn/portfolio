export interface Summary {
  title: string;
  description: string;
  images?: string[];
}

export const Skills: Summary[] = [
  {
    title: 'Google Cloud Platform',
    description: 'James has leveraged Google Cloud Platform to develop and deploy full stack micro-service architecture web applications for customers'
  },
  {
    title: 'Responsive Design',
    description: 'Applications are built to work across all devices and view ports'
  },
  {
    title: 'Material Design',
    description: 'Design rules and approach follow the Material Design specification, but are extended or modified where appropriate.'
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
    description: 'Using his knowledge of hobby electronics, James has designed and built several devices to augment his smart home. He has also retrofit existing consumer devices such as window air conditioners to connect to his home automation server.'
  }
]