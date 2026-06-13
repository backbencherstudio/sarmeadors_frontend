"use client";

type Props = {
  field: any;
};

export default function PaymentRenderer({ field }: Props) {
  return (
    <div className="space-y-3 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Payment"}
        {field.required && " *"}
      </label>
      <div className="space-y-3 border border-borderColor rounded-lg p-4 bg-bgColor">
        <div className="flex items-center border border-borderColor rounded-lg bg-white px-3 py-2.5 gap-2">
          <span className="text-sm text-gray-400 flex-1">
            Enter name on card
          </span>
        </div>
        <div className="flex items-center border border-borderColor rounded-lg bg-white px-3 py-2.5 gap-2">
          <span className="text-sm text-gray-400 flex-1">
            1234 2542 2541 5294
          </span>
          <div className="flex items-center gap-1">
            <div className="w-6 h-4 bg-orange-500 rounded-sm" />
            <div className="w-6 h-4 bg-red-500 rounded-sm opacity-80 -ml-2" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center border border-borderColor rounded-lg bg-white px-3 py-2.5">
            <span className="text-sm text-gray-400">MM / YY</span>
          </div>
          <div className="flex items-center border border-borderColor rounded-lg bg-white px-3 py-2.5">
            <span className="text-sm text-gray-400">CVC</span>
          </div>
        </div>
        <label className="flex items-center gap-2 text-xs text-gray-400">
          <input type="checkbox" className="h-3 w-3" />
          Your payment information is securely stored in our system
        </label>
      </div>
      <div className="flex items-center justify-between border border-borderColor rounded-lg p-3 bg-bgColor">
        <span className="text-sm font-medium text-headerColor">Stripe</span>
        <div className="relative w-8 h-4 rounded-full bg-blackColor">
          <div className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}
