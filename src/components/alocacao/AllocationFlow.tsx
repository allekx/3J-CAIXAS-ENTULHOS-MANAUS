"use client";

import { useRef, useState } from "react";
import { AllocationStepper } from "@/components/alocacao/AllocationStepper";
import { CustomerDataStep } from "@/components/alocacao/CustomerDataStep";
import { ReviewStep } from "@/components/alocacao/ReviewStep";
import { SuccessStep } from "@/components/alocacao/SuccessStep";
import { INITIAL_CUSTOMER_FORM } from "@/constants/alocacao";
import {
  ALLOCATION_SUBMIT_ERROR,
  submitAllocationRequest,
  toPublicAllocationPayload,
} from "@/lib/alocacao/submit-allocation-request";
import { formatRequestDate } from "@/lib/utils/alocacao";
import type { AllocationStep, CustomerFormData } from "@/types/alocacao";

export function AllocationFlow() {
  const [step, setStep] = useState<AllocationStep>(1);
  const [data, setData] = useState<CustomerFormData>(INITIAL_CUSTOMER_FORM);
  const [protocol, setProtocol] = useState("");
  const [submittedAt, setSubmittedAt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submittingRef = useRef(false);

  function goToStep(next: AllocationStep) {
    if (isSubmitting) {
      return;
    }

    setSubmitError(null);
    setStep(next);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function handleChange(patch: Partial<CustomerFormData>) {
    setData((current) => ({ ...current, ...patch }));
  }

  async function handleConfirm() {
    if (submittingRef.current) {
      return;
    }

    const payload = toPublicAllocationPayload(data);

    if (!payload) {
      setSubmitError(ALLOCATION_SUBMIT_ERROR);
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const created = await submitAllocationRequest(payload);
      setProtocol(created.protocol);
      setSubmittedAt(formatRequestDate(new Date(created.createdAt)));
      setStep(3);
      window.scrollTo({ top: 0, behavior: "auto" });
    } catch {
      setSubmitError(ALLOCATION_SUBMIT_ERROR);
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[800px] px-4 py-6 sm:px-6 sm:py-10">
      <AllocationStepper currentStep={step} />

      {step === 1 ? (
        <CustomerDataStep
          data={data}
          onChange={handleChange}
          onContinue={() => goToStep(2)}
        />
      ) : null}

      {step === 2 ? (
        <ReviewStep
          data={data}
          isSubmitting={isSubmitting}
          submitError={submitError}
          onEdit={() => goToStep(1)}
          onConfirm={handleConfirm}
        />
      ) : null}

      {step === 3 ? (
        <SuccessStep protocol={protocol} submittedAt={submittedAt} />
      ) : null}
    </div>
  );
}
