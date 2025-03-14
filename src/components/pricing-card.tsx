"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { supabase } from "../../supabase/supabase";

export default function PricingCard({
  item,
  user,
}: {
  item: any;
  user: User | null;
}) {
  // Handle checkout process
  const handleCheckout = async (priceId: string) => {
    if (!user) {
      // Redirect to login if user is not authenticated
      window.location.href = "/login?redirect=pricing";
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-create-checkout",
        {
          body: {
            price_id: priceId,
            user_id: user.id,
            return_url: `${window.location.origin}/dashboard`,
          },
          headers: {
            "X-Customer-Email": user.email || "",
          },
        },
      );

      if (error) {
        throw error;
      }

      // Redirect to Stripe checkout
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  // Determine button text based on item name
  const getButtonText = () => {
    if (item.name === "Free") return "Get Started";
    return `Upgrade to ${item.name}`;
  };

  return (
    <Card
      className={`w-[350px] relative overflow-hidden ${item.popular ? "border-2 border-blue-500 shadow-xl scale-105" : "border border-gray-200"}`}
    >
      {item.popular && (
        <div className="absolute top-0 left-0 right-0 py-1 text-center text-sm font-medium text-white bg-blue-600">
          Most Popular
        </div>
      )}
      <CardHeader className="relative pt-8">
        <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">
          {item.name}
        </CardTitle>
        <p className="text-sm text-gray-500 mt-1 mb-2">
          {item.name === "Free"
            ? "Essential translation features for registered users."
            : item.name === "Pro"
              ? "Enhanced translation capabilities for professionals."
              : "Unlimited access with premium translation features."}
        </p>
        <CardDescription className="flex items-baseline gap-1 mt-2">
          <span className="text-3xl font-bold text-gray-900">
            ${item?.amount / 100}
          </span>
          <span className="text-gray-600 text-sm">
            {item.name === "Free" ? "/ forever" : "/ per month"}
          </span>
        </CardDescription>
      </CardHeader>
      <div className="px-6 pb-6">
        <ul className="space-y-2 mb-6">
          {item.name === "Free" ? (
            <>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 text-sm">✓</span>
                <span className="text-sm">
                  1,000 characters per translation
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 text-sm">✓</span>
                <span className="text-sm">10 translations per day</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 text-sm">✓</span>
                <span className="text-sm">Ad-supported experience</span>
              </li>
            </>
          ) : item.name === "Pro" ? (
            <>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 text-sm">✓</span>
                <span className="text-sm">
                  5,000 characters per translation
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 text-sm">✓</span>
                <span className="text-sm">50 translations per day</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 text-sm">✓</span>
                <span className="text-sm">Enhanced AI Translation Model</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 text-sm">✓</span>
                <span className="text-sm">No ads</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 text-sm">✓</span>
                <span className="text-sm">Pronunciation speaker</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 text-sm">✓</span>
                <span className="text-sm">Save translation history</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 text-sm">✓</span>
                <span className="text-sm text-gray-400">
                  Document translation (Word/PDF, up to 10MB)
                </span>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 text-sm">✓</span>
                <span className="text-sm">
                  Unlimited characters per translation
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 text-sm">✓</span>
                <span className="text-sm">Unlimited translations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 text-sm">✓</span>
                <span className="text-sm">Enhanced AI Translation Model</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 text-sm">✓</span>
                <span className="text-sm">No ads</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 text-sm">✓</span>
                <span className="text-sm">Pronunciation speaker</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 text-sm">✓</span>
                <span className="text-sm">
                  Microphone input for speech translation
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 text-sm">✓</span>
                <span className="text-sm">
                  Real-time conversation translation
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 text-sm">✓</span>
                <span className="text-sm text-gray-400">
                  Document translation (Word/PDF, up to 50MB)
                </span>
              </li>
            </>
          )}
        </ul>
        <Button
          onClick={async () => {
            await handleCheckout(item.id);
          }}
          className={`w-full py-2 text-base font-medium ${item.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
          variant={item.popular ? "default" : "outline"}
        >
          {getButtonText()}
        </Button>
      </div>
    </Card>
  );
}
