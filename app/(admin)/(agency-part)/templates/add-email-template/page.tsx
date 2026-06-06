"use client";

import Configuration from "@/components/dashboard/ApplicationBuilder/Configuration";
import ContentStep from "@/components/dashboard/ApplicationBuilder/Content";
import Recipients from "@/components/dashboard/ApplicationBuilder/Recipients";
import ArrowLeftIcon from "@/public/icon/ArrowLeftIcon";
import { Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type Step = "configuration" | "recipients" | "content";

const STEPS: { id: Step; label: string; number: number }[] = [
  { id: "configuration", label: "Configuration", number: 1 },
  { id: "recipients", label: "Sender and Recipients", number: 2 },
  { id: "content", label: "Content", number: 3 },
];

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentStep = (searchParams.get("step") || "configuration") as Step;
  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);

  const goToConfiguration = () => {
    router.push("?step=configuration");
  };

  const goToRecipients = () => {
    router.push("?step=recipients");
  };

  const goToContent = () => {
    router.push("?step=content");
  };

  return (
    <div className="p-6">
      <button
        onClick={() => router.back()}
        className="text-lg font-semibold flex items-center gap-2 cursor-pointer"
      >
        <ArrowLeftIcon />
        <span>Add New Template</span>
      </button>

      <div className="mt-8">
        <div className="flex items-center justify-between border-b">
          {STEPS.map((item, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div key={item.id} className="flex items-center w-full">
                <div
                  className={`flex items-center justify-center gap-2 w-full pb-2 ${
                    isCurrent ? "border-b-2 border-gray-900" : ""
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold ${
                      isCompleted
                        ? "bg-green-600 text-white"
                        : isCurrent
                          ? "bg-gray-900 text-white"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {isCompleted ? <Check size={12} /> : item.number}
                  </div>

                  <p
                    className={`text-sm font-medium ${
                      isCurrent ? "text-black" : "text-gray-400"
                    }`}
                  >
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {currentStep === "configuration" && (
          <Configuration onNext={goToRecipients} />
        )}

        {currentStep === "recipients" && (
          <Recipients onBack={goToConfiguration} onNext={goToContent} />
        )}

        {currentStep === "content" && <ContentStep onBack={goToRecipients} />}
      </div>
    </div>
  );
}
