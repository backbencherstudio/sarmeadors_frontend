import AddressCard from "@/components/clients/AgencyLongTermJob/AddressCard";
import ContactCard from "@/components/clients/AgencyLongTermJob/ContactCard";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { Edit3Icon } from "lucide-react";

export default function page() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-[#111927] text-2xl font-semibold">
          Contact & Address
        </h1>
        <ButtonReuseable
          title="Edit Information"
          rightIcon={<Edit3Icon className="text-[#111927]" />}
          className="bg-white !text-[#111927] border border-gray2Color font-semibold"
        />
      </div>
      <div className="mt-4">
        <ContactCard
          primaryContact={{
            name: "Kristin Ben",
            phone: "+14842918883",
            email: "binhan628@gmail.com",
            visible: true,
          }}
          alternateContact={{
            name: "Colleen James",
            phone: "+18143008398",
            email: "tranthuy.nute@gmail.com",
            visible: false,
          }}
        />

        <div className="mt-4">
          <AddressCard
            address={{
              street: "26 Berkshire Ave.",
              city: "Atlantic City",
              provinceState: "NJ",
              postalCode: "08401",
              country: "USA",
            }}
          />
        </div>
      </div>
    </div>
  );
}
