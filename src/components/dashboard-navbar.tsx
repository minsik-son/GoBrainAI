"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  UserCircle,
  Home,
  Languages,
  FileText,
  Image,
  Settings,
  History,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" prefetch className="flex items-center gap-2">
            <Languages className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">TranslateAI</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium"
          >
            <Languages className="h-4 w-4" />
            <span>Text</span>
          </Link>
          <Link
            href="/dashboard?tab=image"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium"
          >
            <Image className="h-4 w-4" />
            <span>Image</span>
          </Link>
          <Link
            href="/dashboard?tab=document"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium"
          >
            <FileText className="h-4 w-4" />
            <span>Document</span>
          </Link>
          <Link
            href="/pricing"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Pricing
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 w-full"
                >
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/dashboard/history"
                  className="flex items-center gap-2 w-full"
                >
                  <History className="h-4 w-4" />
                  <span>Translation History</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2 w-full"
                >
                  <Settings className="h-4 w-4" />
                  <span>Account Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push("/");
                }}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
