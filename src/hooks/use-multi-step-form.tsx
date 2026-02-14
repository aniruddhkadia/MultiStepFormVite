import {
  BillingInfoSchema,
  personalInfoSchema,
  ProfessionalInfoSchema,
  type AllFormFields,
  type Step,
  type StepFormData,
} from "@/types";
import { Briefcase, CreditCard, User } from "lucide-react";
import { useState } from "react";

const StepSchema = [
  personalInfoSchema,
  ProfessionalInfoSchema,
  BillingInfoSchema,
];

export const steps: Step[] = [
  { id: "personal", name: "Personal Info", icon: User },
  { id: "professional", name: "Professional Info", icon: Briefcase },
  { id: "billing", name: "Billing Info", icon: CreditCard },
];

export const useMultiStepForm = () => {
  const [curretStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<AllFormFields>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    experience: undefined,
    industry: "",
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    cvv: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFirstStep = curretStep === 0;
  const isLastStep = curretStep === steps.length - 1;

  //   Returns the schema for current step
  const getCurrentStepSchema = () => {
    return StepSchema[curretStep];
  };

  // Go to next step
  const goToNextStep = () => {
    if (!isLastStep) setCurrentStep((prev) => prev + 1);
  };

  // Go to previous step
  const goToPreviousStep = () => {
    if (!isFirstStep) setCurrentStep((prev) => prev - 1);
  };

  // Merge and Update form data
  const updateFormData = (newData: Partial<AllFormFields>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  // Handle fianl submission
  const submitForm = (data: StepFormData) => {
    console.log("✅ Final Form Data:", data);
    setIsSubmitted(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      position: "",
      experience: undefined,
      industry: "",
      cardNumber: "",
      cardHolderName: "",
      expiryDate: "",
      cvv: "",
    });
    setIsSubmitted(false);
    setCurrentStep(0);
  };

  return {
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
  };
};
