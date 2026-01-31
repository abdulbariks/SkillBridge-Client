"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { Roles } from "@/constants/roles";
import { SidebarRoutes } from "@/types/sidebar";
import { adminRoutes } from "@/routes/adminRoutes";
import { userRoutes } from "@/routes/userRoutes";
import { tutorRoutes } from "@/routes/tutorRoutes";

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string; name: string; email: string; avatar: string };
} & React.ComponentProps<typeof Sidebar>) {
  let data: SidebarRoutes;

  switch (user.role) {
    case Roles.admin:
      data = adminRoutes;
      break;
    case Roles.tutor:
      data = tutorRoutes;
      break;
    case Roles.student:
      data = userRoutes;
      break;
    default:
      return null;
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain
          items={data.navMain.map((item) => ({
            ...item,
            url: item.url ?? "#",
            items: item.items?.map((subItem) => ({
              ...subItem,
              url: subItem.url ?? "#",
            })),
          }))}
        />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
