export type User = {
  name: string;
  role: string;
  avatarUrl?: string;
};

export type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};
