import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import {
  Users,
  UserPlus,
  Search,
  FileSearch,
  Send,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppSidebar() {
  const location = useLocation();
  const [openResdex, setOpenResdex] = React.useState(false);

  const navItems = [
    { name: "Home", path: "/home", icon: UserPlus },
    { name: "Job Posting", path: "/jobposting", icon: UserPlus },
    { name: "Create User", path: "/createuser", icon: UserPlus },
    { name: "All Users", path: "/users", icon: UserPlus },
    { name: "My Archive", path: "/my-archive", icon: UserPlus },
    { name: "Consultant profile Update ", path: "/consultant-profile-resume ", icon: UserPlus },
    // { name: "Consultant Uploded Resume ", path: "/consultant-uploded-resume ", icon: UserPlus },


  ];

  const resdexSubItems = [
    // { name: "Manage Searches", path: "/resdex/manage-search", icon: Search },
    { name: "Search Resumes", path: "/resdex/resume-search", icon: FileSearch },
    // { name: "Send NVites", path: "/resdex/send-nvites", icon: Send },
    // { name: "Folders", path: "/resdex/folders", icon: Send },
    // { name: "Resdex Requirements", path: "/resdex/requirements", icon: Send },
  ];

  const baseItemClass =
    "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors";

  return (
    <Sidebar
      collapsible="icon"
      className="bg-black text-white border-r border-white/10"
    >
      {/* Header */}
      <SidebarHeader className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black">
        <span className="font-bold text-lg text-white">RD</span>
        <SidebarTrigger className="text-white hover:bg-white/10" />
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="bg-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">
            Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.path}
                        className={`${baseItemClass} ${
                          isActive
                            ? "bg-white/15 text-white"
                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}

              {/* Resdex Section */}
              <SidebarMenuItem>
                <button
                  onClick={() => setOpenResdex(!openResdex)}
                  className={`${baseItemClass} w-full justify-between text-gray-300 hover:bg-white/10 hover:text-white`}
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 shrink-0" />
                    <span>Resdex</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openResdex ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </SidebarMenuItem>

              {openResdex && (
                <div className="ml-6 space-y-1">
                  {resdexSubItems.map((sub) => {
                    const SubIcon = sub.icon;
                    const isActive = location.pathname === sub.path;

                    return (
                      <SidebarMenuItem key={sub.path}>
                        <SidebarMenuButton asChild>
                          <Link
                            to={sub.path}
                            className={`${baseItemClass} text-sm ${
                              isActive
                                ? "bg-white/15 text-white"
                                : "text-gray-300 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            <SubIcon className="h-3.5 w-3.5 shrink-0" />
                            <span>{sub.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-white/10 bg-black">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton asChild>
                  <button
                    className={`${baseItemClass} w-full text-gray-300 hover:bg-white/10 hover:text-white`}
                  >
                    <Users className="h-4 w-4" />
                    <span>My Account</span>
                  </button>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent side="top" className="w-40">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
