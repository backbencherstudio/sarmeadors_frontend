import ResuableMenu from "@/components/common/ResuableMenu";

function MyCandidatesTopMenu() {
  const menuItems = [
    {
      id: 1,
      title: "New Candidates",
      href: "/client/client-my-candidates/new-candidates",
    },
    {
      id: 2,
      title: "Previous Candidates",
      href: "/client/client-my-candidates/previous-candidates",
    },
  ];

  return (
    <div>
      <div className="">
        <h1 className="font-semibold capitalize leading-[160%]">
          My Candidates
        </h1>
      </div>
      <div className="w-full">
        <ResuableMenu
          initialPath="/client/client-my-candidates"
          menuData={menuItems}
        />
      </div>
    </div>
  );
}

export default MyCandidatesTopMenu;
