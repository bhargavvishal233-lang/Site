export interface NavItem {
  title: string;
  href: string;
  children?: {
    title: string;
    description?: string;
    href: string;
  }[];
}
