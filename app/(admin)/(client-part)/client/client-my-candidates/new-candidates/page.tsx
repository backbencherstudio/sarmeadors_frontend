import Image from "next/image";
import Link from "next/link";

const PROFILES = [
  {
    id: 1,
    image: "/candidates/candidates.png",
    name: "Cameron Williamson",
    locations: ["Miami", "New York", "Other Locations"],
    roles: ["Nanny", "House Manager"],
    experience: "08 Years",
    description:
      "I have cared for children from infancy through early adolescence, with a strong passion and focus on early childhood development.",
  },
  {
    id: 2,
    image: "/candidates/candidates-1.png",
    name: "Darrell Steward",
    locations: ["New York", "Miami"],
    roles: ["Nanny", "House Manager"],
    experience: "04 Years",
    description:
      "I have experience providing structured childcare, supporting developmental milestones, and creating engaging, age-appropriate activities.",
  },
  {
    id: 3,
    image: "/candidates/candidates-2.png",
    name: "Darlene Robertson",
    locations: ["Miami", "New York", "Other Locations"],
    roles: ["Nanny", "Baby/Night Nurse"],
    experience: "05 Years",
    description:
      "I have 8 years of experience as a nanny and house manager, working with children from infancy to school age.",
  },
  {
    id: 4,
    image: "/candidates/candidates.png",
    name: "Darlene Robertson",
    locations: ["Miami", "New York", "Other Locations"],
    roles: ["Nanny", "Baby/Night Nurse"],
    experience: "05 Years",
    description:
      "I have 8 years of experience as a nanny and house manager, working with children from infancy to school age.",
  },
  {
    id: 5,
    image: "/candidates/candidates-1.png",
    name: "Cameron Williamson",
    locations: ["Miami", "New York", "Other Locations"],
    roles: ["Nanny", "House Manager"],
    experience: "08 Years",
    description:
      "I have cared for children from infancy through early adolescence, with a strong passion and focus on early childhood development.",
  },
  {
    id: 6,
    image: "/candidates/candidates-2.png",
    name: "Darrell Steward",
    locations: ["New York", "Miami"],
    roles: ["Nanny", "House Manager"],
    experience: "04 Years",
    description:
      "I have experience providing structured childcare, supporting developmental milestones, and creating engaging, age-appropriate activities.",
  },
];

export default function NewCandidatesPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
      {PROFILES?.map((profile) => (
        <div
          key={profile?.id}
          className="p-6 border flex flex-col justify-between h-full border-[#E5E7EB] rounded-[24px]"
        >
          <div className="flex items-start gap-x-6">
            <div>
              <Image
                src={profile?.image}
                alt="image"
                height={100}
                width={100}
              />
            </div>
            <div>
              <h1 className="text-[20px] text-[#111927] font-semibold">
                {profile?.name}
              </h1>
              <p className="text-[16px] text-[#384250]">
                {profile?.locations.join(", ")}
              </p>

              <p className="text-[16px] text-[#384250]">
                {profile?.roles?.map((role, index) => (
                  <span key={index}>
                    {role}
                    {index < profile?.roles?.length - 1 && " | "}
                  </span>
                ))}
              </p>
              <button className="mt-2 px-3 py-1.5 bg-[#E6F0FF] rounded-full">
                Experience: {profile?.experience}
              </button>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-[#384250] text-[16px]">{profile?.description}</p>
          </div>
          <div className="mt-10 w-full">
            <Link
              href={"/client/client-my-candidates/new-candidates/1"}
              className="text-[16px] text-[#111927] font-semibold px-6 py-4 border border-[#384250] rounded-[12px] block w-full cursor-pointer text-center"
            >
              View profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
