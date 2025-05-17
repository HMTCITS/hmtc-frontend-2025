import { LucideIcon } from 'lucide-react';

import ButtonLink from '@/components/links/ButtonLink';

export default function SocialCard({
  icon: Icon,
  href,
}: {
  icon: LucideIcon;
  href: string;
}) {
  return (
    <ButtonLink
      aria-label='Social media link'
      variant='light'
      href={href}
      className='full rounded text-black hover:bg-text-black'
      icon={Icon}
    />
  );
}
