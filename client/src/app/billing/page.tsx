//@ts-nocheck

//Fix type ishh MUST
"use client";
import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const allFeatures = [
  "Manage SKUs",
  "Order tracking",
  "Connect social media platforms",
  "AI assistant scripts",
  "AI-supported messages",
  "Multi-language support",
  "Marketing automation tools",
  "API integrations",
  "AI-powered lead generation",
  "Advanced analytics and SEO tools",
];

const plans = [
  {
    title: "Free Plan",
    price: "Free",
    description: "For individuals just getting started",
    features: {
      "Manage SKUs": "up to 25 SKUs",
      "Order tracking": "Basic",
      "Connect social media platforms": "1 platform",
      "AI assistant scripts": "Predefined",
    },
    cta: "Get Started",
    style: "bg-card",
  },
  {
    title: "Basic Plan",
    price: "$15/month",
    description: "Perfect for small businesses",
    features: {
      "Manage SKUs": "up to 100 SKUs",
      "Order tracking": "Enhanced",
      "Connect social media platforms": "2 platforms",
      "AI assistant scripts": "Predefined",
      "AI-supported messages": "50/month",
    },
    cta: "Upgrade Now",
    style: "bg-card",
  },
  {
    title: "Diamond Plan",
    price: "$49/month",
    description: "Ideal for growing companies",
    features: {
      "Manage SKUs": "up to 500 SKUs",
      "Order tracking": "Advanced",
      "Connect social media platforms": "5 platforms",
      "AI assistant scripts": "Customizable",
      "AI-supported messages": "500/month",
      "Multi-language support": true,
      "Marketing automation tools": true,
    },
    cta: "Choose Diamond",
    // style:
    //   "bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900",
    popular: true,
  },
  {
    title: "Platinum Plan",
    price: "$99/month",
    description: "For large enterprises and power users",
    features: {
      "Manage SKUs": "Unlimited SKUs",
      "Order tracking": "Advanced",
      "Connect social media platforms": "Unlimited",
      "AI assistant scripts": "Fully customizable",
      "AI-supported messages": "Unlimited",
      "Multi-language support": true,
      "Marketing automation tools": true,
      "API integrations": true,
      "AI-powered lead generation": true,
      "Advanced analytics and SEO tools": true,
    },
    cta: "Go Platinum",
    // style:
    //   "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900",
  },
];

export default function SubscriptionPlans() {
  const router = useRouter();

  return (
    <section className="h-screen w-full flex items-center ">
      <Button
        onClick={() => router.back()}
        variant="outline"
        size="icon"
        className="fixed left-4 top-4"
      >
        <IconArrowLeft />
      </Button>
      <div className="container mx-auto py-10 ">
        <h2 className="text-3xl font-bold text-center mb-10">
          Upgrade Your Shop
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.title}
              className={`${plan.style} relative overflow-hidden`}
            >
              <CardHeader>
                <CardTitle>{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-4">{plan.price}</div>
                <ul className="space-y-2">
                  {allFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {plan.features[feature] ? (
                        <Check className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground mr-2 mt-1 flex-shrink-0" />
                      )}
                      <span
                        className={`text-sm ${
                          !plan.features[feature] && "text-muted-foreground"
                        }`}
                      >
                        {feature}
                        {plan.features[feature] &&
                          typeof plan.features[feature] === "string" && (
                            <span className="font-semibold text-foreground">
                              {" "}
                              ({plan.features[feature]})
                            </span>
                          )}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl">
                  Most Popular
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
