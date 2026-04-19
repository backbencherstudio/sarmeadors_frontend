import AddressCard from "@/components/clients/AgencyLongTermJob/RequestedJobDetails/AddressCard";
import ContactCard from "@/components/clients/AgencyLongTermJob/RequestedJobDetails/ContactCard";
import LongTermJobDetailsTopBar from "@/components/clients/AgencyLongTermJob/RequestedJobDetails/LongTermJobDetailsTopBar";

export default function page() {
  return (
    <div>
      <LongTermJobDetailsTopBar title={"Contact & Address"} />
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
