import type { useForm } from "react-hook-form";
import FormField from "./form-field";
import { CardTitle } from "./ui/card";
import type { AllFormFields } from "@/types";
import type { UseFormTrigger } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface stepProps {
  register: ReturnType<typeof useForm<AllFormFields>>["register"];
  errors: Record<string, { message?: string }>;
  setValue: ReturnType<typeof useForm<AllFormFields>>["setValue"];
  trigger: UseFormTrigger<AllFormFields>;
}

const PersonalInfoStep = ({
  register,
  errors,
  setValue,
  trigger,
}: stepProps) => {
  return (
    <div className="space-y-4">
      <CardTitle>Personal Information</CardTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="firstName"
          label="First Name"
          register={register}
          errors={errors}
          type="text"
          trigger={trigger as any}
          setValue={setValue}
        />
        <FormField
          id="lastName"
          label="Last Name"
          register={register}
          errors={errors}
          type="text"
          trigger={trigger as any}
          setValue={setValue}
        />
      </div>
      <FormField
        id="email"
        label="Email"
        register={register}
        errors={errors}
        type="email"
        trigger={trigger as any}
        setValue={setValue}
      />
      <FormField
        id="phone"
        label="Phone"
        register={register}
        errors={errors}
        type="tel"
        trigger={trigger as any}
        setValue={setValue}
      />
    </div>
  );
};

const ProfessionalInfoStep = ({
  register,
  errors,
  setValue,
  trigger,
}: stepProps) => {
  const [experience, setExperience] = useState<string>("");

  return (
    <div className="space-y-4">
      <CardTitle>Professional Details</CardTitle>

      <FormField
        id="company"
        label="Company"
        register={register}
        errors={errors}
        type="text"
        trigger={trigger as any}
        setValue={setValue}
      />
      <FormField
        id="position"
        label="Position"
        register={register}
        errors={errors}
        type="text"
        trigger={trigger as any}
        setValue={setValue}
      />

      <div className="">
        <label htmlFor="experience" className="">
          Year of Experience
        </label>

        <Select
          value={experience}
          onValueChange={(value) => {
            setValue("experience", value as AllFormFields["experience"], {
              shouldValidate: true,
            });
            setExperience(value);
          }}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-2">0-2 years</SelectItem>
            <SelectItem value="3-5">3-5 years</SelectItem>
            <SelectItem value="6-10">6-10 years</SelectItem>
            <SelectItem value="10+">10+ years</SelectItem>
          </SelectContent>
        </Select>
        {errors.experience && (
          <p className="text-red-500 text-sm">{errors.experience.message}</p>
        )}
      </div>

      <FormField
        id="industry"
        label="Industry"
        register={register}
        errors={errors}
        type="text"
        trigger={trigger as any}
        setValue={setValue}
      />
    </div>
  );
};

const BillingInfoStep = ({
  register,
  errors,
  setValue,
  trigger,
}: stepProps) => {
  return (
    <div className="space-y-4">
      <CardTitle>Billing Information</CardTitle>

      <FormField
        id="cardNumber"
        label="Card Number"
        register={register}
        errors={errors}
        type="text"
        maxLength={16}
        trigger={trigger as any}
        setValue={setValue}
      />
      <FormField
        id="cardHolderName"
        label="Card Holder Name"
        register={register}
        errors={errors}
        type="text"
        trigger={trigger as any}
        setValue={setValue}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="expiryDate"
          label="Expiry Date"
          register={register}
          errors={errors}
          type="text"
          trigger={trigger as any}
          setValue={setValue}
        />
        <FormField
          id="cvv"
          label="CVV"
          register={register}
          errors={errors}
          type="text"
          maxLength={4}
          trigger={trigger as any}
          setValue={setValue}
        />
      </div>
    </div>
  );
};

export { PersonalInfoStep, ProfessionalInfoStep, BillingInfoStep };
