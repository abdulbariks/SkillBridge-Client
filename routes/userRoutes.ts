import { SidebarRoutes } from "@/types/sidebar";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

export const userRoutes: SidebarRoutes = {
  user: {
    name: "",
    email: "",
    avatar: "",
  },
  teams: [
    { name: "Skill Bridge", logo: GalleryVerticalEnd, plan: "Enterprise" },
    // { name: "Acme Corp.", logo: AudioWaveform, plan: "Startup" },
    // { name: "Evil Corp.", logo: Command, plan: "Free" },
  ],
  navMain: [
    {
      title: "User Management",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "Booking", url: "/dashboard/bookings" },
        // { title: "Starred", url: "#" },
        // { title: "Settings", url: "#" },
      ],
    },
    // {
    //   title: "Models",
    //   icon: Bot,
    //   items: [
    //     { title: "Genesis", url: "#" },
    //     { title: "Explorer", url: "#" },
    //     { title: "Quantum", url: "#" },
    //   ],
    // },
    // {
    //   title: "Documentation",
    //   icon: BookOpen,
    //   items: [
    //     { title: "Introduction", url: "#" },
    //     { title: "Get Started", url: "#" },
    //     { title: "Tutorials", url: "#" },
    //     { title: "Changelog", url: "#" },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   icon: Settings2,
    //   items: [
    //     { title: "General", url: "#" },
    //     { title: "Team", url: "#" },
    //     { title: "Billing", url: "#" },
    //     { title: "Limits", url: "#" },
    //   ],
    // },
  ],
  projects: [
    // { name: "Design Engineering", url: "#", icon: Frame },
    // { name: "Sales & Marketing", url: "#", icon: PieChart },
    // { name: "Travel", url: "#", icon: Map },
  ],
};
