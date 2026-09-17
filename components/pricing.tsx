"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, HelpCircle, Zap, Building2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for small projects and startups",
    icon: Zap,
    monthlyPrice: 4999,
    yearlyPrice: 49990,
    features: [
      { name: "Up to 3 team members", included: true },
      { name: "Basic project management", included: true },
      { name: "Standard support (48h response)", included: true },
      { name: "Single application development", included: true },
      { name: "Basic analytics dashboard", included: true },
      { name: "30-day bug fixes warranty", included: true },
      { name: "Priority support", included: false },
      { name: "Dedicated project manager", included: false },
      { name: "Custom integrations", included: false },
      { name: "24/7 support", included: false },
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses",
    icon: Rocket,
    monthlyPrice: 8000,
    yearlyPrice: 800000,
    features: [
      { name: "Up to 10 team members", included: true },
      { name: "Advanced project management", included: true },
      { name: "Priority support (24h response)", included: true },
      { name: "Multi-platform development", included: true },
      { name: "Advanced analytics & reporting", included: true },
      { name: "90-day bug fixes warranty", included: true },
      { name: "Priority support", included: true },
      { name: "Dedicated project manager", included: true },
      { name: "Custom integrations", included: false },
      { name: "24/7 support", included: false },
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large-scale operations",
    icon: Building2,
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      { name: "Unlimited team members", included: true },
      { name: "Enterprise project management", included: true },
      { name: "24/7 dedicated support", included: true },
      { name: "Full-stack development suite", included: true },
      { name: "Custom analytics & BI tools", included: true },
      { name: "Lifetime bug fixes warranty", included: true },
      { name: "Priority support", included: true },
      { name: "Dedicated project manager", included: true },
      { name: "Custom integrations", included: true },
      { name: "24/7 support", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqs = [
  {
    question: "What's included in the bug fixes warranty?",
    answer:
      "Our warranty covers any bugs or issues directly related to the code we deliver. This includes functional bugs, performance issues, and security vulnerabilities introduced during development.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can change your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the credit will be applied to your next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, bank transfers, and can set up custom invoicing for Enterprise clients. All payments are processed securely through Stripe.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 14-day money-back guarantee for our Starter and Professional plans. Enterprise contracts are subject to individual terms.",
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const formatPrice = (price: number | null) => {
    if (price === null) return "Custom";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "MMK",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Pricing Plans
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Transparent Pricing for Every Scale
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Choose the plan that fits your needs. All plans include our core
            features with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span
              className={cn(
                "text-sm",
                !isYearly && "text-foreground font-medium",
              )}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 bg-secondary rounded-full p-1 transition-colors"
            >
              <motion.div
                className="w-5 h-5 bg-primary rounded-full"
                animate={{ x: isYearly ? 28 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span
              className={cn(
                "text-sm flex items-center gap-2",
                isYearly && "text-foreground font-medium",
              )}
            >
              Yearly
              <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-medium rounded-full">
                Save 17%
              </span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative bg-card border rounded-2xl p-8 transition-all",
                  plan.popular
                    ? "border-primary shadow-lg shadow-primary/10 md:scale-105"
                    : "border-border hover:border-primary/50",
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                </div>

                <p className="text-muted-foreground text-sm mb-6">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {formatPrice(price)}
                  </span>
                  {price !== null && (
                    <span className="text-muted-foreground">
                      /{isYearly ? "year" : "month"}
                    </span>
                  )}
                </div>

                <Button
                  onClick={scrollToContact}
                  className={cn(
                    "w-full mb-8",
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-foreground hover:bg-secondary/80",
                  )}
                >
                  {plan.cta}
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.name}
                      className={cn(
                        "flex items-center gap-3 text-sm",
                        feature.included
                          ? "text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {feature.included ? (
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                      )}
                      {feature.name}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    className="text-muted-foreground"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedFaq === index ? "auto" : 0,
                    opacity: expandedFaq === index ? 1 : 0,
                  }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 text-muted-foreground text-sm">
                    {faq.answer}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
