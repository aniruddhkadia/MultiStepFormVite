import type { Step } from "@/types";
import { Check } from "lucide-react";

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

const ProgressSteps = ({ steps, currentStep }: ProgressStepsProps) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={step.id} className="flex items-start flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ease-in-out ${
                  isCompleted
                    ? "text-white bg-green-500"
                    : isCurrent
                      ? "text-white bg-gray-900"
                      : "text-white bg-gray-200"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>

              <span className="text-xs mt-2 font-medium">{step.name}</span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-[2px] mx-2 mt-5 bg-gray-200 transition-colors duration-300 ease-in-out ${
                  isCompleted ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressSteps;
