import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { AllFormFields } from "../types";
import { useMultiStepForm } from "@/hooks/use-multi-step-form";
import { useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import ProgressSteps from "./progress-steps";
import {
  BillingInfoStep,
  PersonalInfoStep,
  ProfessionalInfoStep,
} from "./steps";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import type { StepFormData } from "../types";
import emailjs from "@emailjs/browser";

const MultiStepForm = () => {
  // Custom Hook
  const {
    curretStep,
    formData,
    isFirstStep,
    isLastStep,
    isSubmitted,
    steps,
    goToNextStep,
    goToPreviousStep,
    updateFormData,
    submitForm,
    resetForm,
    getCurrentStepSchema,
  } = useMultiStepForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    reset,
  } = useForm<AllFormFields>({
    resolver: zodResolver(getCurrentStepSchema() as any),
    mode: "onChange",
    defaultValues: formData,
  });

  useEffect(() => {
    reset(formData);
  }, [curretStep, formData, reset]);

  const onNext = async (data: StepFormData) => {
    // Manual validation check
    const isValid = await trigger();
    if (!isValid) return;

    console.log(data, formData);

    const updatedData = { ...formData, ...data };
    updateFormData(updatedData);

    // Merge current step data with existing form data
    if (isLastStep) {
      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: `${updatedData.firstName} ${updatedData.lastName}`,
            from_email: updatedData.email,
            to_name: "Admin",
            to_email: "admin@example.com",

            // Personal Info
            firstName: updatedData.firstName,
            lastName: updatedData.lastName,
            email: updatedData.email,
            phone: updatedData.phone,

            // Professional Info
            company: updatedData.company,
            position: updatedData.position,
            experience: updatedData.experience,
            industry: updatedData.industry,

            // Computed
            name: `${updatedData.firstName} ${updatedData.lastName}`,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        );
        submitForm(updatedData);
      } catch (error) {
        console.error("Error submitting form:", error);
        alert(
          "Failed to submit form. Please check your connection and try again.",
        );
      }
    } else {
      goToNextStep();
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white">
          <CardContent className="pt-10 pb-10 text-center">
            <div className="mb-6 flex justify-center text-green-500">
              <CheckCircle2 size={80} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Submission Successful!
            </h2>
            <p className="text-gray-600 mb-8">
              Thank you for completing the registration. Your information has
              been successfully submitted.
            </p>
            <Button
              onClick={resetForm}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Start New Registration
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-white">
        <CardHeader>
          <ProgressSteps steps={steps} currentStep={curretStep} />
        </CardHeader>
        <CardContent className="p-6">
          {curretStep === 0 && (
            <PersonalInfoStep
              register={register}
              errors={errors}
              trigger={trigger}
              setValue={setValue}
            />
          )}
          {curretStep === 1 && (
            <ProfessionalInfoStep
              register={register}
              errors={errors}
              trigger={trigger}
              setValue={setValue}
            />
          )}
          {curretStep === 2 && (
            <BillingInfoStep
              register={register}
              errors={errors}
              trigger={trigger}
              setValue={setValue}
            />
          )}

          <div className="flex justify-between mt-6">
            <Button
              onClick={goToPreviousStep}
              type="button"
              variant="outline"
              disabled={isFirstStep}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={handleSubmit(onNext as any)}
              type="button"
            >
              {isLastStep ? "Submit" : "Next"}
              {!isLastStep && <ChevronRight className="ml-1 h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiStepForm;
