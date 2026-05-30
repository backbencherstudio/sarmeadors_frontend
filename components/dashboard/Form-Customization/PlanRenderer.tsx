"use client";

import {
  setActiveField,
  updateFieldProperties,
} from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import { Check } from "lucide-react";
import { useDispatch } from "react-redux";

type Props = {
  field: any;
  activeBlockId: string;
  activeSectionId: string | null;
};

export default function PlanRenderer({
  field,
  activeBlockId,
  activeSectionId,
}: Props) {
  const dispatch = useDispatch();
  const plans: any[] = Array.isArray(field.plans) ? field.plans : [];
  const selectedPlanId = field.selectedPlanId || plans[0]?.id || "";

  const handlePlanSelect = (planId: string) => {
    dispatch(
      setActiveField({
        sectionId: activeSectionId,
        fieldId: field.id,
      }),
    );

    dispatch(
      updateFieldProperties({
        blockId: activeBlockId,
        sectionId: activeSectionId,
        fieldId: field.id,
        key: "selectedPlanId",
        value: planId,
      }),
    );
  };

  if (!plans.length) {
    return (
      <div className="space-y-3 w-full">
        <div>
          <h3 className="text-xl font-semibold text-headerColor">
            {field.label || "Choose a plan"}
          </h3>
          <p className="text-sm text-secondaryColor">
            {field.shortDescription || "Select a plan to continue."}
          </p>
        </div>
        <div className="border border-borderColor rounded-lg p-4 bg-bgColor">
          <div className="text-sm text-gray-500">No plans configured.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 w-full">
      <div>
        <h3 className="text-xl font-semibold text-headerColor">
          {field.label || "Choose a plan"}
        </h3>
        <p className="text-sm text-secondaryColor">
          {field.shortDescription || "Select a plan to continue."}
        </p>
      </div>

      <div className="space-y-3">
        {plans.map((p) => (
          <label
            key={p.id}
            className="flex items-start justify-between border border-borderColor rounded-lg p-4 bg-white cursor-pointer"
            onClick={() => handlePlanSelect(p.id)}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name={`plan_select_${field.id}`}
                className="h-4 w-4 mt-1"
                checked={selectedPlanId === p.id}
                onChange={() => handlePlanSelect(p.id)}
              />

              <div>
                <div className="flex items-center gap-3">
                  <div className="text-base font-semibold text-headerColor">
                    {p.name}
                  </div>
                  <div className="text-sm text-secondaryColor">
                    {p.description}
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-600">
                  <ul className="space-y-1">
                    {(p.features || []).map((f: any, i: number) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-bold">{p.price}</div>
              <div className="text-xs text-gray-400">Per Month</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
