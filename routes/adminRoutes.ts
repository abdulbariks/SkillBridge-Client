import { SidebarRoutes } from "@/types/sidebar";
import { GalleryVerticalEnd, Settings2 } from "lucide-react";

export const adminRoutes: SidebarRoutes = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/admin.jpg",
  },
    teams: [
    { name: "Skill Bridge", logo: GalleryVerticalEnd, plan: "Enterprise" },
    // { name: "Acme Corp.", logo: AudioWaveform, plan: "Startup" },
    // { name: "Evil Corp.", logo: Command, plan: "Free" },
  ],
  navMain: [
    {
      title: "Admin Management",
      icon: Settings2,
      items: [
        { title: "Users", url: "/admin-dashboard/users" },
        { title: "Booking", url: "/admin-dashboard/bookings" },
        { title: "Categories", url: "/admin-dashboard/categories" },
      ],
    },
  ],
  projects: [],
};
