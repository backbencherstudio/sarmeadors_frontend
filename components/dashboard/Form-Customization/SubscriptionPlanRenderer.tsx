"use client";

import { Check } from "lucide-react";
import { useMemo, useState } from "react";

type Props = {
  field: any;
};

type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
};

const defaultPlans = (): SubscriptionPlan[] => [
  {
    id: "plan_1",
    name: "Plan 1",
    description: "Description 1",
    price: "0",
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
  {
    id: "plan_2",
    name: "Plan 2",
    description: "Description 2",
    price: "0",
    features: [],
  },
];

const normalizePlans = (plans: any): SubscriptionPlan[] => {
  if (!Array.isArray(plans) || plans.length === 0) return defaultPlans();

  return plans.map((plan: any, index: number) => ({
    id: String(plan?.id || `plan_${index + 1}`),
    name: String(plan?.name || `Plan ${index + 1}`),
    description: String(plan?.description || ""),
    price: String(plan?.price ?? "0"),
    features: Array.isArray(plan?.features)
      ? plan.features.map((f: any) => String(f))
      : [],
  }));
};

export default function SubscriptionPlanRenderer({ field }: Props) {
  const plans = useMemo(() => normalizePlans(field?.plans), [field?.plans]);
  const [selectedPlanId, setSelectedPlanId] = useState(plans[0]?.id || "");

  return (
    <div className="space-y-3 w-full">
      <div>
        <h3 className="text-xl font-semibold text-headerColor">
          Payment Information
        </h3>
        <p className="text-sm text-secondaryColor">
          Your card will be charged for the booking fee only.
        </p>
      </div>

      <div>
        <h4 className="text-base font-semibold text-headerColor">
          {field.label || "Stripe Subscription Selection"}
          {field.required && <span className="text-red-500 ml-0.5">*</span>}
        </h4>
      </div>

      <div className="space-y-2">
        {plans.map((plan) => {
          const selected = selectedPlanId === plan.id;

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => setSelectedPlanId(plan.id)}
              className={`w-full text-left rounded-lg border p-3 transition-colors ${
                selected
                  ? "border-headerColor bg-white"
                  : "border-borderColor bg-bgColor"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <span
                    className={`mt-1 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                      selected ? "border-headerColor" : "border-gray-300"
                    }`}
                  >
                    {selected && (
                      <span className="h-2 w-2 rounded-full bg-headerColor" />
                    )}
                  </span>

                  <div>
                    <p className="text-base font-medium text-headerColor">
                      {plan.name}
                    </p>
                    <p className="text-xs text-secondaryColor">
                      {plan.description}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl leading-5 font-medium text-headerColor">
                    ${plan.price}
                  </p>
                  <p className="text-xs text-secondaryColor">Per Month</p>
                </div>
              </div>

              {selected && plan.features.length > 0 && (
                <div className="mt-3 pl-7 space-y-1">
                  {plan.features.map((feature, index) => (
                    <p
                      key={`${plan.id}-feature-${index}`}
                      className="text-sm text-secondaryColor flex items-center gap-1"
                    >
                      <Check size={12} />
                      {feature}
                    </p>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
