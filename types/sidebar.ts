import { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: { title: string; url: string }[];
}

export interface NavGroup {
  title: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavItem[];
}

export interface Team {
  name: string;
  logo: LucideIcon;
  plan: string;
}

export interface Project {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface SidebarUser {
  name: string;
  email: string;
  avatar: string;
}

export interface SidebarRoutes {
  user: SidebarUser;
  teams: Team[];
  navMain: NavGroup[];
  projects: Project[];
}
