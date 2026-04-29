import ChildrenInformationCard from "@/components/clients/AgencyLongTermJob/RequestedJobDetails/ChildrenInformationCard";
import LongTermJobDetailsTopBar from "@/components/clients/AgencyLongTermJob/RequestedJobDetails/LongTermJobDetailsTopBar";

interface ChildProfileCardProps {
  name: string;
  dateOfBirth: string;
  gender: string;
  interests: string;
  allergiesOrNeeds: string;
}

const children: ChildProfileCardProps[] = [
  {
    name: "Savannah Nguyen",
    dateOfBirth: "1 Feb, 2020",
    gender: "Female",
    interests:
      "Loves outdoor activities, especially riding a scooter and playing at the park. She enjoys drawing, building with LEGO, and listening to storybooks before bed.",
    allergiesOrNeeds:
      "Has a mild allergy to peanuts, which causes hives if ingested. We carry an antihistamine as advised by our doctor. She also wears glasses for reading. No other medical conditions or special needs at this time.",
  },
  {
    name: "Liam Torres",
    dateOfBirth: "14 Aug, 2018",
    gender: "Male",
    interests:
      "Passionate about dinosaurs, soccer, and painting. He loves animals and enjoys building things with blocks. Favourite book series is Diary of a Wimpy Kid.",
    allergiesOrNeeds:
      "No known food allergies. Has mild asthma — inhaler is kept in his backpack at all times. Please ensure he takes a 5-minute rest if he becomes too breathless during physical activity.",
  },
  {
    name: "Mia Chen",
    dateOfBirth: "22 Mar, 2019",
    gender: "Female",
    interests:
      "Loves dancing, singing, and anything related to music. She enjoys arts and crafts and is very creative. Big fan of animated movies and often re-enacts scenes with her toys.",
    allergiesOrNeeds:
      "Allergic to bee stings — EpiPen is always in her bag. Please keep her away from areas with flowering plants during outdoor play. No dietary restrictions.",
  },
];

export default function page() {
  return (
    <div>
      <LongTermJobDetailsTopBar title={"Children Information"} />
      <div className="space-y-4 mt-4">
        {children.map((child) => (
          <ChildrenInformationCard key={child.name} {...child} />
        ))}
      </div>
    </div>
  );
}
