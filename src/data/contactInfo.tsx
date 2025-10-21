import { ContactInfo } from "@/types/types";
import { BrandIcon } from "@/components/BrandIcon";

export const contactInfo: ContactInfo[] = [
    {
      icon: <BrandIcon name='github' className="w-6 h-6 hover:text-primary" />,
      label: 'GitHub',
      value: 'github.com/jptrsn',
      href: 'https://github.com/jptrsn'
    },
    {
      icon: <BrandIcon name='linkedin' />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/educoder',
      href: 'https://linkedin.com/in/educoder'
    },
    {
      icon: <BrandIcon name='mastodon' />,
      label: 'Mastodon',
      value: '@educoder@mastodon.online',
      href: 'https://mastodon.online/@educoder'
    },
    {
      icon: <BrandIcon name='discourse' />,
      label: 'Discourse',
      value: '@EduCoder',
      href: 'https://classroom.cafe/u/educoder'
    }
  ];