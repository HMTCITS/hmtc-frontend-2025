import { IconType } from 'react-icons';

import ButtonLink from '@/components/links/ButtonLink';

export default function SocialCard({
  icon: Icon,
  href,
}: {
  icon: IconType;
  href: string;
}) {
  return (
    <ButtonLink
      variant='light'
      href={href}
      className='full rounded text-black hover:bg-text-black'
      icon={Icon}
    />
  );
}
