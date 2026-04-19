import ButtonReuseable from "@/components/reusable/CustomButton";
import { Edit3Icon } from "lucide-react";

export default function LongTermJobDetailsTopBar({ title }: { title: string }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-[#111927] text-2xl font-semibold">{title}</h1>
        <ButtonReuseable
          title="Edit Information"
          rightIcon={<Edit3Icon className="text-[#111927]" />}
          className="bg-white !text-[#111927] border border-gray2Color font-semibold"
        />
      </div>
    </div>
  );
}
