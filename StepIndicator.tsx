interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#6C24FF]/20 to-[#00FFD5]/20 border border-[#00EAFF]/30 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span className="text-[#00EAFF]">Step</span>
        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#6C24FF] to-[#00FFD5]">
          {currentStep}
        </span>
        <span className="text-gray-400">of {totalSteps}</span>
      </div>
    </div>
  );
}
