"use client";

import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import ReusableTextarea from "@/components/common/InputFiled/TextAreaField";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { updateFieldProperties } from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import DeleteIcon from "@/public/icon/DeleteIcon";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
};

type Props = {
  activeBlockId: string;
  activeFieldId: string;
  activeSectionId?: string | null;
  activeField: any;
};

const defaultPlans = (): SubscriptionPlan[] => [
  {
    id: `plan_${Date.now()}_1`,
    name: "Plan 1",
    description: "Description 1",
    price: "0",
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
  {
    id: `plan_${Date.now()}_2`,
    name: "Plan 2",
    description: "Description 2",
    price: "0",
    features: [],
  },
];

const normalizePlans = (plans: any): SubscriptionPlan[] => {
  if (!Array.isArray(plans) || plans.length === 0) return defaultPlans();

  return plans.map((plan: any, index: number) => ({
    id: String(plan?.id || `plan_${Date.now()}_${index + 1}`),
    name: String(plan?.name || `Plan ${index + 1}`),
    description: String(plan?.description || ""),
    price: String(plan?.price ?? "0"),
    features: Array.isArray(plan?.features)
      ? plan.features.map((f: any) => String(f))
      : [],
  }));
};

export default function SubscriptionPlanFieldSettings({
  activeBlockId,
  activeFieldId,
  activeSectionId,
  activeField,
}: Props) {
  const dispatch = useDispatch();

  const plans = useMemo(
    () => normalizePlans(activeField?.plans),
    [activeField?.plans],
  );

  const [expandedPlanId, setExpandedPlanId] = useState<string>(
    plans[0]?.id || "",
  );

  const handlePropertyChange = (key: string, value: any) => {
    dispatch(
      updateFieldProperties({
        blockId: activeBlockId,
        sectionId: activeSectionId,
        fieldId: activeFieldId,
        key,
        value,
      }),
    );
  };

  const updatePlans = (nextPlans: SubscriptionPlan[]) => {
    handlePropertyChange("plans", nextPlans);
  };

  const updatePlan = (
    planId: string,
    key: keyof SubscriptionPlan,
    value: any,
  ) => {
    const next = plans.map((plan) =>
      plan.id === planId ? { ...plan, [key]: value } : plan,
    );
    updatePlans(next);
  };

  const deletePlan = (planId: string) => {
    const next = plans.filter((plan) => plan.id !== planId);
    updatePlans(next.length ? next : defaultPlans());
    if (expandedPlanId === planId) {
      setExpandedPlanId(next[0]?.id || "");
    }
  };

  const addPlan = () => {
    const next: SubscriptionPlan = {
      id: `plan_${Date.now()}`,
      name: `Plan ${plans.length + 1}`,
      description: "",
      price: "0",
      features: [],
    };
    const all = [...plans, next];
    updatePlans(all);
    setExpandedPlanId(next.id);
  };

  const addFeature = (planId: string) => {
    const target = plans.find((plan) => plan.id === planId);
    if (!target) return;
    updatePlan(planId, "features", [
      ...target.features,
      `Feature ${target.features.length + 1}`,
    ]);
  };

  const updateFeature = (
    planId: string,
    featureIndex: number,
    value: string,
  ) => {
    const target = plans.find((plan) => plan.id === planId);
    if (!target) return;
    const nextFeatures = [...target.features];
    nextFeatures[featureIndex] = value;
    updatePlan(planId, "features", nextFeatures);
  };

  const deleteFeature = (planId: string, featureIndex: number) => {
    const target = plans.find((plan) => plan.id === planId);
    if (!target) return;
    const nextFeatures = target.features.filter(
      (_, index) => index !== featureIndex,
    );
    updatePlan(planId, "features", nextFeatures);
  };

  return (
    <div className="space-y-3">
      <div className="border-b pb-3">
        <ReusableInput
          required
          label={"Section Name"}
          value={activeField?.label || ""}
          onChange={(e) => handlePropertyChange("label", e.target.value)}
          className="w-full bg-bgColor text-sm"
        />
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900">Plans</h3>
      </div>

      <div className="space-y-2">
        {plans.map((plan) => {
          const expanded = expandedPlanId === plan.id;
          return (
            <div
              key={plan.id}
              className="rounded-lg border bg-white overflow-hidden"
            >
              <div className="flex items-center justify-between px-3 py-3 gap-2">
                <button
                  type="button"
                  className="text-left w-full text-sm font-semibold text-headerColor"
                  onClick={() => setExpandedPlanId(plan.id)}
                >
                  {plan.name || "Untitled Plan"}
                </button>
                {plans.length > 1 && (
                  <button
                    type="button"
                    onClick={() => deletePlan(plan.id)}
                    className="cursor-pointer"
                    aria-label="Delete plan"
                  >
                    <DeleteIcon className="w-4 h-4 text-redColor" />
                  </button>
                )}
              </div>

              {expanded && (
                <div className="px-3 pb-3 space-y-3 border-t pt-3">
                  <ReusableInput
                    required
                    label={"Plan Name"}
                    value={plan.name}
                    onChange={(e) =>
                      updatePlan(plan.id, "name", e.target.value)
                    }
                    className="w-full bg-bgColor text-sm"
                  />

                  <ReusableTextarea
                    label="Description"
                    value={plan.description}
                    onChange={(e) =>
                      updatePlan(plan.id, "description", e.target.value)
                    }
                    className="w-full bg-bgColor text-sm"
                  />

                  <div>
                    <label className="text-xs font-semibold text-gray-700">
                      Price
                    </label>
                    <div className="mt-1 flex items-center border border-borderColor rounded-lg bg-bgColor px-3">
                      <input
                        value={plan.price}
                        onChange={(e) =>
                          updatePlan(plan.id, "price", e.target.value)
                        }
                        className="w-full bg-transparent py-2.5 text-sm outline-none"
                      />
                      <span className="text-sm text-headerColor">$</span>
                    </div>
                  </div>

                  <div className="space-y-2 border-t pt-3">
                    <p className="text-xs font-semibold text-gray-700">
                      Features
                    </p>
                    {plan.features.map((feature, index) => (
                      <div
                        key={`${plan.id}-feature-${index}`}
                        className="flex items-center gap-2"
                      >
                        <ReusableInput
                          value={feature}
                          onChange={(e) =>
                            updateFeature(plan.id, index, e.target.value)
                          }
                          className="w-full bg-bgColor text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => deleteFeature(plan.id, index)}
                          className="cursor-pointer"
                          aria-label="Delete feature"
                        >
                          <DeleteIcon className="w-4 h-4 text-redColor" />
                        </button>
                      </div>
                    ))}

                    <ButtonReuseable
                      type="button"
                      onClick={() => addFeature(plan.id)}
                      icon={<PlusIcon size={14} />}
                      title=" Add"
                      className="px-3.5! py-2.5! bg-bgColor! text-black! border rounded text-xs!"
                    />
                  </div>

                  <label className="flex items-center gap-2 text-xs pt-1 font-semibold text-gray-700">
                    <input
                      type="checkbox"
                      checked={Boolean(activeField?.required)}
                      onChange={(e) =>
                        handlePropertyChange("required", e.target.checked)
                      }
                      className="h-4 w-4 rounded accent-blackColor cursor-pointer border-gray-300"
                    />
                    Keep Mandatory
                  </label>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ButtonReuseable
        type="button"
        onClick={addPlan}
        icon={<PlusIcon size={14} />}
        title=" Add Another Plan"
        className="px-3.5! py-2.5! bg-blackColor! text-white! rounded text-xs!"
      />
    </div>
  );
}
