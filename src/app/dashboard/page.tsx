import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import TranslationInterface from "@/components/translation-interface";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Check if user has a premium subscription
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .single();

  const isPremium = !!subscription;

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Translation Dashboard</h1>
            {!isPremium && (
              <div className="bg-blue-50 text-sm p-3 px-4 rounded-lg text-blue-700 flex gap-2 items-center border border-blue-100">
                <InfoIcon size="14" />
                <span>
                  You're using the free tier.{" "}
                  <a href="/pricing" className="underline font-medium">
                    Upgrade to Pro
                  </a>{" "}
                  for premium features like text-to-speech, voice input, and
                  larger document translations.
                </span>
              </div>
            )}
          </header>

          {/* Translation Interface */}
          <TranslationInterface isPremium={isPremium} />
        </div>
      </main>
    </>
  );
}
