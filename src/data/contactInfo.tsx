import { ContactInfo } from "@/app/types/types";
import { BrandIcon } from "@/components/BrandIcon";

export const contactInfo: ContactInfo[] = [
    {
      icon: <BrandIcon name='github' />,
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
      value: '@educoder',
      href: 'https://mastodon.online/@educoder'
    }
  ];