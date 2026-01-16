import React from "react";
import { Bell, LogOut, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="flex h-16 items-center justify-end gap-4 border-b bg-background px-6">
      {/* Upload Button */}
      <Button
        variant="default"
        className="flex items-center gap-2"
        onClick={() => navigate("/my-uploads")}
      >
        <Upload className="h-4 w-4" />
        Uploads
      </Button>

      {/* Bell Icon */}
      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
      </Button>

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarFallback className="bg-muted text-sm font-medium">
              U
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
