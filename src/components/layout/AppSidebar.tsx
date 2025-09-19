import { useState } from "react";
import { CompanyLogo } from "@/components/ui/company-logo";
import { NavLink, useLocation } from "react-router-dom";
import { useDeveloperMode } from "@/hooks/useDeveloperMode";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from 'react-i18next';
import {
  MessageSquare,
  Settings,
  Code
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";
  const { isDeveloperMode, toggleDeveloperMode } = useDeveloperMode();
  const { t } = useTranslation();

  const navigationItems = [
    {
      titleKey: "navigation.chat",
      url: "/dashboard",
      icon: MessageSquare,
      group: "studio"
    },
    {
      titleKey: "navigation.settings",
      url: "/settings",
      icon: Settings,
      group: "dashboard"
    }
  ];

  const groupedItems = navigationItems.reduce((acc, item) => {
    if (!acc[item.group]) {
      acc[item.group] = [];
    }
    acc[item.group].push(item);
    return acc;
  }, {} as Record<string, typeof navigationItems>);

  const groupLabels = {
    studio: t("groups.studio"),
    dashboard: t("groups.dashboard")
  };

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <CompanyLogo className="h-10 w-10" />
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">AI-HUB</h1>
              <p className="text-xs text-sidebar-foreground/70">Enterprise Platform</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {Object.entries(groupedItems).map(([groupKey, items]) => {
          return (
            <SidebarGroup key={groupKey}>
              {!collapsed && (
                <SidebarGroupLabel className="text-sidebar-foreground/70">
                  {groupLabels[groupKey as keyof typeof groupLabels]}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={isActive(item.url)}>
                        <NavLink
                          to={item.url}
                          className={({ isActive }) =>
                            `flex items-center gap-3 ${
                              isActive
                                ? "bg-sidebar-accent text-sidebar-primary"
                                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                            }`
                          }
                        >
                          <item.icon className="h-4 w-4" />
                          {!collapsed && <span>{t(item.titleKey)}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="px-4 py-3 text-xs text-sidebar-foreground/50">
          {!collapsed && "v2.0.0 Enterprise"}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}