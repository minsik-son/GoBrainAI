import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import { createClient } from "../../../supabase/server";
import { Check } from "lucide-react";

export default async function Pricing() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: plans, error } = await supabase.functions.invoke(
    "supabase-functions-get-plans",
  );

  // Features for each plan
  const planFeatures = {
    free: [
      "Basic text translation",
      "Limited image translation",
      "Document translation up to 1MB",
      "5 languages",
      "Standard translation speed",
    ],
    pro: [
      "Advanced text translation",
      "Full image OCR translation",
      "Document translation up to 5MB",
      "50 languages",
      "Text-to-speech",
      "Translation history",
      "Faster translation speed",
    ],
    premium: [
      "Enterprise-grade translation",
      "Advanced OCR with formatting",
      "Document translation up to 20MB",
      "100+ languages",
      "Text-to-speech in all languages",
      "Voice input",
      "Unlimited translation history",
      "Priority support",
      "Fastest translation speed",
    ],
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Choose Your Translation Plan
          </h1>
          <p className="text-xl text-muted-foreground">
            Select the perfect plan for your translation needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans?.map((item: any, index: number) => (
            <div key={item.id} className="flex flex-col">
              <PricingCard item={item} user={user} />

              {/* Features list */}
              <div className="mt-6 bg-white rounded-lg border p-6 flex-grow">
                <h3 className="font-semibold text-lg mb-4">Features</h3>
                <ul className="space-y-3">
                  {(index === 0
                    ? planFeatures.free
                    : index === 1
                      ? planFeatures.pro
                      : planFeatures.premium
                  ).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-semibold text-lg mb-2">
                Can I change plans at any time?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                will take effect immediately.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-semibold text-lg mb-2">
                How accurate are the translations?
              </h3>
              <p className="text-gray-600">
                Our AI-powered translation engine achieves 99.9% accuracy for
                most common languages, with continuous improvements through
                machine learning.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-semibold text-lg mb-2">Is my data secure?</h3>
              <p className="text-gray-600">
                Yes, we take data security seriously. All translations are
                encrypted and we don't store your content unless you explicitly
                save it to your history.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-semibold text-lg mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                We offer a 14-day money-back guarantee if you're not satisfied
                with our premium services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
