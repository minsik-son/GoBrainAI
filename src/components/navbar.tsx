import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";
import UserProfile from "./user-profile";
import AuthDialog from "./auth-dialog";

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" prefetch className="flex items-center gap-2">
          <Languages className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold">TranslateAI</span>
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Translate
          </Link>
          <Link
            href="/pricing"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            About
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link href="/dashboard" className="hidden sm:block">
                <Button>Dashboard</Button>
              </Link>
              <UserProfile />
            </>
          ) : (
            <AuthDialog triggerClassName="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700" />
          )}
        </div>
      </div>
    </nav>
  );
}
